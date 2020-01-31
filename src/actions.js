// actions.js ;
import axios from "./axios";

// FOR CHATROOM
export function allChatMessages(messages) {
    console.log("chatroom messages", messages);
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

// from Ivanas lesson
// all ajax requests will go in this file

// export function getListOfAnimals() {
//     return axios.get("/get-list-animals").then(({ data }) => {
//         return {
//             type: "ADD_LIST_ANIMALS",
//             listAnimals: data
//         };
//     });
// }
// return axios.get("/friendsWannabes", {user:id}).then(({ data }) => { >>>use later
// all ajax requests will go in this file

/// REFACTORED CODE

// export async function friendsWannabes() {
//     const { data } = await axios.get("/friendsWannabes");
//     return {
//         type: "RECEIVE_FRIENDS_WANNABES",
//         friendsWannabes: data.users
//     };
// }
//
// export async function acceptFriendRequest(id) {
//     await axios.post(`/acceptfriendship/${id}`);
//     console.log("data in acceptfriendship Test", id);
//     return {
//         type: "ACCEPT_FRIEND_REQUEST",
//         acceptedUserId: id
//     };
// }
//
// export async function unfriend(id) {
//     await axios.post(`/deleteFriends/${id}`);
//     console.log("data in deleteFriends Test", id);
//     return {
//         type: "UNFRIEND",
//         endUserId: id
//     };
// }

// in actions.js...

// ​receiveFriendsWannabes — should run when the Friends component mounts. Makes an ajax GET request to retrieve list of friends and wannabes

// should return an object with type property, and another property called friendsWannabes whose value will be the list of friends and wannabes we got back from the server

// acceptFriendRequest - makes a POST request to server to update the database.

// should return an object with a type property, and another property called acceptedUserId whose value is the id of the user who's friendship was accepted.

// unfriend - makes a POST request to the server to update the database.

// should return an object with a type property, and another property called endUserId whose value is the id of the user whose friendship was ended.

/// ALL ACTIONS FROM HOT OR NOT EG

// export async function receiveUsers() {
//     const { data } = await axios.get("/users");
//     return {
//         type: "RECEIVE_USERS",
//         users: data.users
//     };
// }

// export async function makeHot(id) {
//     await axios.post(`/hot/${id}`);
//     return {
//         type: "MAKE_HOT",
//         id
//     };
// }

// export async function makeNot(id) {
//     await axios.post(`/not/${id}`);
//     return {
//         type: "MAKE_NOT",
//         id
//     };
// }
