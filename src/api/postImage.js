import axios from "../config/request.js";
import fd from "form-data";
import * as routes from "../structures/endpoints.js";
import fs from "fs";

let filename = "../a.png";
export const post = async (credentials, url, { tags, description }) => {
	console.log(url);
	const form = new fd();
	form.append("description", description);
	form.append("type", "pic");
	form.append("image", fs.createReadStream(filename));
	const response = axios
		.post(
			`${routes.CONTENT}`,
			{ data: form },
			{
				headers: {
					Cookie:
						"CID=24fdc3d39d57d0d21f845902f1cd047da8b5fc2238ee9540ba8aad800728fe13.b0baebff80e5a5f2; sound=off; viewMode=list; _ga=GA1.2.20305756.1680619327; __gads=ID=9454083d8d4e42db:T=1680619327:S=ALNI_MZf03VkhOpO1zfC0QrVCvrOLyCiDQ; __gpi=UID=000009f03067dda4:T=1680619327:RT=1680813618:S=ALNI_MZ543SoRJFLrSETPOzacafWbIzhvA; SID=s%3AIAA2oG6MaseuFzoCWRTBn7fjYyUDR33A.b4CPiAR4ws%2Bxb11IHvtII%2FuSE9QlCx%2Bk8obiKSq7xz8; LAST_VISIT_AT=1680813615460; _gid=GA1.2.1943981531.1680813618; x-csrf-token=287a88d1c9573e2cf97e3b78e8a99ad4",
					"x-csrf-token": "287a88d1c9573e2cf97e3b78e8a99ad4",
				},
			},
		)
		.then((r) => {
			console.log("okkk");
		})
		.catch((e) => {
			console.log(e.request);
		});
};
