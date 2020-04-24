import React from "react";
import ReactDOM from "react-dom";
import "../public/css/normalize.css";
import "../public/css/style.css";
import { Welcome } from "./welcome";
import { App } from "./app";
// import * as io from "socket.io-client";
// import { Socket } from "./socket";

import { Provider } from "react-redux";

import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducers";

import { init as initSocket } from "./socket";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

let elem;
if (location.pathname == "/welcome") {
    console.log("welcome - location.pathname", location.pathname);
    elem = <Welcome />;
} else {
    console.log("logo - location.pathname", location.pathname);
    initSocket(store);
    elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}
// main being the element in index.html
ReactDOM.render(elem, document.querySelector("main"));
