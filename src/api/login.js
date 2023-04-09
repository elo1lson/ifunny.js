import * as routes from "../structures/endpoints.js";
import axios from "../config/request.js";
import { getToken } from "../config/auth.js";
import { getImageChapta } from "./chapta.js";
import { exec } from "child_process";
import { resolve } from "path";
import { log } from "console";

export const login = async ({ email, password, cookie, token }) => {
	if (typeof email !== "string" || typeof password !== "string") {
		throw new Error("Email and password must be strings");
	}

	axios
		.post(
			routes.LOGIN,
			{
				username: email,
				password,
			},
			{
				headers: {
					Cookie: cookie,
					"x-csrf-token": token,
				},
			},
		)
		.then((r) => {
			console.log(r.data);
		})
		.catch((e) => {
			const error = e.response.data;
			const id = error.id;
			const code = error.code;
			const { details } = e.response.data;
			if (id === "ERR_INVALID_CSRF") {
				throw new Error("Invalid CSRF token");
			}

			switch (details.type) {
				case "fun_captcha":
					getImageChapta(details.ticketId, cookie, token).then((r) => {
						const pythonProcess = exec(
							`python3 app/captcha/main.py ${r.image}`,
						);

						pythonProcess.stdout.on("data", (data) => {
							axios
								.put(
									routes.FUN_CHAPTA + "/" + details.ticketId,
									{ code: data },
									{
										headers: {
											Cookie: cookie,
											"x-csrf-token": token,
										},
									},
								)
								.then((r) => {
									console.log(r.data,222);
								})
								.catch((e) => {
									console.log(e.response.data);
								});
						});

						pythonProcess.stderr.on("data", (data) => {
							console.error(`stderr: ${data}`);
						});

						pythonProcess.on("close", (code) => {
							console.log(`child process exited with code ${code}`);
						});
					});
					break;

				default:
					break;
			}
		});
};
