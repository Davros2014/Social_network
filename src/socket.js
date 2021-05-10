import * as io from "socket.io-client";

import { allChatMessages, chatMessage } from "./actions/actions";

export let socket;

// export const init = store => {
//     if (!socket) {
//         socket = io.connect();
//         socket.on("allChatMessages", msgs =>
//             store.dispatch(allChatMessages(msgs))
//         );
//         socket.on("chatMessage", msg => store.dispatch(chatMessage(msg)));
//     }
// };
export const init = store => {
    if (!socket) {
        socket = io.connect("https://zero-socialnetwork.herokuapp.com/", {
            secure: true
        });
        socket.on("allChatMessages", msgs =>
            store.dispatch(allChatMessages(msgs))
        );
        socket.on("chatMessage", msg => store.dispatch(chatMessage(msg)));
    }
};
