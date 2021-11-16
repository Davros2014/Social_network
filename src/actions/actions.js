// actions.js ;
import axios from "../axios";

// FOR CHATROOM
export function allChatMessages(messages) {
    return {
        type: "ALL_CHAT_MESSAGES",
        allChatMessages: messages
    };
}

export function chatMessage(message) {
    //CHAT MESSAGE
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
            // data in friendsWannabes
            return {
                type: "RECEIVE_FRIENDS_WANNABES",
                friendsWannabes: data.users
            };
        })
        .catch(err => {
            console.log(err);
        });
}

export function acceptFriendRequest(id) {
    return axios
        .post("/acceptfriendship", {
            otheruserid: id,
            buttonName: "Accept Friend Request"
        })
        .then(({ data }) => {
            // data in acceptfriendship
            return {
                type: "ACCEPT_FRIEND_REQUEST",
                acceptedUserId: id
            };
        })
        .catch(err => {
            console.log(err);
        });
}

export function unfriend(id) {
    return axios
        .post("/deleteFriends", {
            otheruserid: id,
            buttonName: "Unfriend User"
        })
        .then(({ data }) => {
            // data in deleteFriends Test
            return {
                type: "UNFRIEND",
                endUserId: id
            };
        })
        .catch(err => {
            console.log(err);
        });
}
