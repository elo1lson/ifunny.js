import { login as apiLogin } from "./api/login.js";
import { post } from "./api/postImage.js";
import Credentials from "./structures/login.js";
export { getToken } from "./config/auth.js";
let credentials;

export default class Ifunny {
	constructor({ email = "", password = "", cookie = [], token = "" }) {
		this.addCredentials({ email, password, cookie, token });
	}

	addCredentials({ email, password, cookie, token }) {
		const credentials = new Credentials({ email, password, cookie, token });
		this.credentials = credentials;
	}

	async login() {
		const logged = await apiLogin(this.credentials);
		console.log(logged, 'logged')
		this.logged = logged;
	}

	get isLogged() {
		return this.logged || null;
	}

	get getCredentials() {
		return this.credentials || {};
	}

	async post(url, { tags = "", description = "", type = "video" || "pic" }) {
		post(this.getCredentials, url, { tags, description, type });
	}
}

export { credentials };
