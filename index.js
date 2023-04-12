import { log } from "util";
import Ifunny from "./src/ifunny.js";
import { getToken } from "./src/ifunny.js";
import { config } from "dotenv";
import { writeFile } from "fs";
config();

try {
	const credentials = await getToken();
	// writeFile(
	// 	"a.json",
	// 	JSON.stringify(credentials),
	// 	{ encoding: "utf8" },
	// 	(err) => {
	// 		console.log(err);
	// 	},
	// );
	const client = new Ifunny({
		email: process.env.EMAIL,
		password: process.env.PASSWORD,
		cookie: credentials.rawCookie,
		token: credentials.token,
	});
	let a = await client.login();
	console.log(a,'login');
	await client.post("o", { tags: "oi", description: "oiii", type: "pic" });
} catch (e) {
	console.log(e);
}
