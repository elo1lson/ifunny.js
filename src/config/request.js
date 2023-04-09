import axios from "axios";
import { BASE_URL } from "../structures/endpoints.js";

const instance = axios.create({
	baseURL: BASE_URL,
	headers: {
		"User-Agent":
			"Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/111.0",
		Accept: "application/json",
		"Accept-Language": "pt,en-US;q=0.7,en;q=0.3",
		"content-type": "application/json",
		"x-requested-with": "fetch",
		//"x-csrf-token": "9209f15642c979259e00ec27c23fc76f",
		"Sec-Fetch-Dest": "empty",
		"Sec-Fetch-Mode": "same-origin",
		"Sec-Fetch-Site": "same-origin",
		//  Cookie:
		//"x-csrf-token=9209f15642c979259e00ec27c23fc76f; CID=d3c559faac24d7c083ffe88ecd0ad977d552b717952d6173da737e0ad3462327.73e7151ad0ac4a99; sound=off; viewMode=list; _ga=GA1.2.990633253.1680570249; _gid=GA1.2.466984479.1680570249; __gads=ID=fa091f5cd43c1bfd-22d8cfcadf7f000d:T=1680570253:S=ALNI_Ma3oAOGVUJxtb3stnPSbtNMaLMQnw; __gpi=UID=000009f026e4d5dc:T=1680570253:RT=1680570253:S=ALNI_Mb0QfBPxH-RY2Sm-5pHfyc2Y0SwMA",
	},
	mode: "cors",
});

export default instance;
