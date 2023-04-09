import axios from "axios";

export const getToken = () => {
	return axios
		.get("https://br.ifunny.co", {
			headers: {
				"User-Agent":
					"Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/111.0",
				Accept:
					"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
				"Accept-Language": "pt,en-US;q=0.7,en;q=0.3",
				"Upgrade-Insecure-Requests": "1",
				"Sec-Fetch-Dest": "document",
				"Sec-Fetch-Mode": "navigate",
				"Sec-Fetch-Site": "none",
				"Sec-Fetch-User": "?1",
				Pragma: "no-cache",
				"Cache-Control": "no-cache",
			},
		})
		.then((r) => {
			const cookie = r.headers["set-cookie"];
			let token = cookie.filter((c) => c.includes("token"))[0];
			token = token.split(";")[0].split("=")[1];

			return {
				rawCookie: cookie,
				token,
			};
		})
		.catch((e) => {
			return {
				error: e.error.message,
			};
		});
};
