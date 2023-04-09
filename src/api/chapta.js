import * as routes from "../structures/endpoints.js";
import axios from "../config/request.js";

export const getImageChapta = (ticketId, cookie, token) => {
	return axios
		.get(`${routes.FUN_CHAPTA}/${ticketId}`, {
			headers: { Cookie: cookie, "x-csrf-token": token },
		})
		.then((r) => {
			return r.data;
		})
		.catch((e) => {
			console.log(e.response.data);
			console.log(111);
		});
};
