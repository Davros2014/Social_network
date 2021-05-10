import React from "react";
import { render } from "react-dom";
//styles
import "./scss/style.scss";

//components
import Welcome from "./components/welcome";
import App from "./app";
// import * as io from "socket.io-client";
// import { Socket } from "./socket";

import { Provider } from "react-redux";

import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducers/reducers";

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

render(elem, document.querySelector("main"));
