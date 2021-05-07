//   old version      "axios": "^0.21.1",         "csurf": "^1.11.0",

import axios from "axios";

var instance = axios.create({
    xsrfCookieName: "mytoken",
    xsrfHeaderName: "csrf-token"
});

export default instance;
// import axios from "axios";
//
// var instance = axios.create({
//     baseURL: "http://localhost:8080",
//     xsrfCookieName: "mytoken",
//     xsrfHeaderName: "csrf-token",
//     withCredentials: true,
//     headers: {
//         "Cross-origin-Embedder-Policy": "require-corp",
//         "Cross-origin-Opener-Policy": "same-origin"
//     }
// });
//
// export default instance;
