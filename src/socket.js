import * as io from "socket.io-client";

import { allChatMessages, chatMessage } from "./actions/actions";

export let socket;

//old
// export const init = store => {
//     if (!socket) {
//         socket = io.connect();
//         socket.on("allChatMessages", msgs =>
//             store.dispatch(allChatMessages(msgs))
//         );
//         socket.on("chatMessage", msg => store.dispatch(chatMessage(msg)));
//     }
// };

const socketURL =
    process.env.NODE_ENV === "production"
        ? window.location.hostname
        : "https://localhost:8080";
console.log("socketURL", socketURL);
export const init = store => {
    if (!socket) {
        socket = io.connect(socketURL, { secure: true });
        socket.on("allChatMessages", msgs =>
            store.dispatch(allChatMessages(msgs))
        );
        socket.on("chatMessage", msg => store.dispatch(chatMessage(msg)));
    }
};
