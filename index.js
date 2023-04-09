import Ifunny from "./src/ifunny.js";
import { getToken } from "./src/ifunny.js";
import { config } from "dotenv";
config();
const credentials = getToken().then((c) => {
	new Ifunny({
		email: process.env.EMAIL,
		password: process.env.PASSWORD,
		cookie: c.rawCookie,
		token: c.token,
	}).login();
	//.post("https://i.stack.imgur.com/H186L.png", { description: "oi" });
});
