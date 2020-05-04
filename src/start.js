import React from "react";
import ReactDOM from "react-dom";
//styles
import "../public/css/normalize.css";
import "../public/css/style.css";

//components
import Welcome from "./components/welcome";
import App from "./app";
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
    elem = <Welcome />;
} else {
    initSocket(store);
    elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}
// main being the element in index.html
ReactDOM.render(elem, document.querySelector("main"));
