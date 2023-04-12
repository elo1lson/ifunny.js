import axios from "../config/request.js";
import fd from "form-data";
import * as routes from "../structures/endpoints.js";
import fs from "fs";

let filename = "../bulma.png";
export const post = async (credentials, url, { tags, description, type }) => {

	const form = new fd();
	
	form.append("description", description);
	form.append("type", type || "pic");
	form.append("image", fs.createReadStream(filename));
	
	const response = axios
		.post(
			`${routes.CONTENT}`,
			{ data: form },
			{
				headers: {
					Cookie: credentials.cookie,
					"x-csrf-token": credentials.token,
				},
			},
		)
		.then((r) => {
			console.log("555555555555555");
			console.log(r.data);
		})
		.catch((e) => {
			console.log("request");
		});
};
