// actions.js ;
import axios from "../axios";

// FOR CHATROOM
export function allChatMessages(messages) {
    // console.log("chatroom messages", messages);
    return {
        type: "ALL_CHAT_MESSAGES",
        allChatMessages: messages
    };
}

export function chatMessage(message) {
    console.log("///////////CHAT MESSAGE", message);
    return {
        type: "CHAT_MESSAGE",
        chatMessage: message
    };
}

// FOR FRIENDS PAGE
export function friendsWannabes() {
    return axios
        .get("/friendsWannabes")
        .then(({ data }) => {
            console.log("///////////data in friendsWannabes Test", data);
            return {
                type: "RECEIVE_FRIENDS_WANNABES",
                friendsWannabes: data.users
            };
        })
        .catch(err => {
            console.log("error", err);
        });
}

export function acceptFriendRequest(id) {
    return axios
        .post("/acceptfriendship", {
            otheruserid: id,
            buttonName: "Accept Friend Request"
        })
        .then(({ data }) => {
            console.log("data in acceptfriendship Test", data);
            return {
                type: "ACCEPT_FRIEND_REQUEST",
                acceptedUserId: id
            };
        })
        .catch(err => {
            console.log("error", err);
        });
}

export function unfriend(id) {
    return axios
        .post("/deleteFriends", {
            otheruserid: id,
            buttonName: "Unfriend User"
        })
        .then(({ data }) => {
            console.log("data in deleteFriends Test", data);
            return {
                type: "UNFRIEND",
                endUserId: id
            };
        })
        .catch(err => {
            console.log("error", err);
        });
}
