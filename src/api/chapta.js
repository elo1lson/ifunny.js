import * as routes from "../structures/endpoints.js";
import axios from "../config/request.js";

export const getImageChapta = async (ticketId, cookie, token, callback) => {
	const req = await axios.get(`${routes.FUN_CHAPTA}/${ticketId}`, {
		headers: { Cookie: cookie, "x-csrf-token": token },
	});
	return callback(req.data);
};
