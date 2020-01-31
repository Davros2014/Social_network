// reducers.js
// code from Ivanas lesson

// export default function reducer(state = {}, action) {
//     if (action.type === "ADD_LIST_ANIMALS") {
//         console.log("reducer action", action);
//         // here i would tell reducer how to add list of animals to global state
//         // spread operator (...)
//         // Object.assign()
//         return { ...state, testList: action.testList };
//     }
//
//     console.log("state", state);
//     console.log("action", action);
//     return state;
// }

// in src create file called 'reducers.js'

export default function reducer(state = {}, action) {
    if (action.type === "RECEIVE_FRIENDS_WANNABES") {
        console.log("reducer action - friends wannabees", action);
        return { ...state, friendsWannabes: action.friendsWannabes };
    }

    if (action.type === "ACCEPT_FRIEND_REQUEST") {
        console.log("reducer action - accept friends wannabees", action);
        return {
            ...state,
            friendsWannabes: state.friendsWannabes.map(user => {
                if (user.id == action.acceptedUserId) {
                    return { ...user, accepted: true };
                } else {
                    return user;
                }
            })
        };
    }
    if (action.type === "UNFRIEND") {
        console.log("reducer action - unfriend wannabees", action);
        return {
            ...state,
            friendsWannabes: state.friendsWannabes.filter(
                user => !(user.id == action.endUserId)
            )
        };
    }
    if (action.type === "ALL_CHAT_MESSAGES") {
        console.log(
            "reducer action - ALL_CHAT_MESSAGES",
            action.allChatMessages
        );
        return { ...state, allChatMessages: action.allChatMessages };
    }
    if (action.type === "CHAT_MESSAGE") {
        console.log("reducer action - CHAT_MESSAGE", action);
        return {
            ...state,
            chatMessage: state.chatMessage
            // .map(user => {
            // if (user.id == action.acceptedUserId) {
            //     return { ...user, accepted: true };
            // } else {
            //     return user;
            // }
            // })
        };
    }
    return state;
}

// in reducers.js...
// "RECEIVE_FRIENDS_WANNABES" — return a new state object (using either the … or Object.assign()) it should have all the properties of the current state object (so we need to clone the global state) and then we need to add to it a property called friendsWannabes whose value is the list of friends and wannabes we got from the server.
//
// "ACCEPT_FRIEND_REQUEST" — return a new state object that has the same properties of the current state object but the friendsWannabes array (created above in the previous conditional) will be cloned and replaced by a new friendsWannabes array that looks exactly the same as the old one, EXCEPT the user who's friendship was accepted should have its accepted property set to true
//
// 'UNFRIEND' — return a new state object that has the same properties of the current state object but the friendsWannabes array should be cloned, and the clone should look exactly the same as the previous array EXCEPT that the user whose friendship was ended should be removed from the array.
// HINT: filter

// if (action.type === "UNFRIEND") {
//     console.log("reducer action - unfriend wannabees", action);
//     // here i would tell reducer how to add list of animals to global state
//     // spread operator (...)
//     // Object.assign()
//     return { ...state, endUserId: action.endUserId };
// }
//
// console.log("state", state);
// console.log("action", action);
// return state;

// ALL REDUCER CODE FROM HOT OR NOT

// export default function(state = {}, action) {
//     if (action.type == 'RECEIVE_USERS') {
//         state = Object.assign({}, state, {
//             users: action.users
//         });
//     }
//     if (action.type == 'MAKE_HOT' || action.type == 'MAKE_NOT') {
//         state = {
//             ...state,
//             users: state.users.map(
//                 user => {
//                     if (user.id == action.id) {
//                         return {
//                             ...user,
//                             hot: action.type == 'MAKE_HOT'
//                         }
//                     } else {
//                         return user;
//                     }
//                 }
//             )
//         };
//     }
//     return state;
// }
