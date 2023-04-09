import Ifunny from "./src/ifunny.js";
import { getToken } from "./src/ifunny.js";

const credentials = getToken().then((c) => {
    new Ifunny({
        email: "eloilsonfontenele2@gmail.com",
        password: "eloilson2",
        cookie: c.rawCookie,
        token: c.token,
    }).login();
    //.post("https://i.stack.imgur.com/H186L.png", { description: "oi" });
});

