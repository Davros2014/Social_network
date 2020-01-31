import React from "react";

import * as io from "socket.io-client";

import { allChatMessages, chatMessage } from "./actions";

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();
        socket.on("allChatMessages", msgs =>
            store.dispatch(allChatMessages(msgs))
        );
        socket.on("chatMessage", msg => store.dispatch(chatMessage(msg)));
    }
};
