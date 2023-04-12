import { exec } from "child_process";
import { log } from "console";
import * as routes from "../structures/endpoints.js";
import axios from "../config/request.js";
import { getImageChapta } from "./chapta.js";

const validateEmailAndPassword = (email, password) => {
	if (typeof email !== "string" || typeof password !== "string") {
		throw new Error("Email and password must be strings");
	}
};

const handleInvalidCSRFToken = () => {
	throw new Error("Invalid CSRF token");
};

const handleFunCaptcha = async (details, cookie, token) => {
	const callbackDetails = async (details) => {
		if (!details.ticketId) return;

		return new Promise((resolve, reject) => {
			const pythonProcess = exec(
				`python3 app/captcha/main.py ${details.image}`,
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
					.then(() => {
						resolve({ logged: true });
					})
					.catch((e) => {
						resolve(
							getImageChapta(
								e.response.data.details.ticketId,
								cookie,
								token,
								callbackDetails,
							),
						);
					});
			});
		});
	};

	return getImageChapta(details.ticketId, cookie, token, callbackDetails);
};

export const login = async ({ email, password, cookie, token }) => {
	validateEmailAndPassword(email, password);

	try {
		const response = await axios.post(
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
		);
		return response.data;
	} catch (e) {
		const error = e.response.data;
		const { id, code, details } = error;

		if (id === "ERR_INVALID_CSRF") {
			handleInvalidCSRFToken();
		}

		if (details.type == "fun_captcha") {
			return handleFunCaptcha(details, cookie, token);
		}
	}
};
