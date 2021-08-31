// reducers.js

export default function reducer(state = {}, action) {
    if (action.type === "RECEIVE_FRIENDS_WANNABES") {
        // console.log("reducer action - friends wannabees", action);
        return { ...state, friendsWannabes: action.friendsWannabes };
    }

    if (action.type === "ACCEPT_FRIEND_REQUEST") {
        // console.log("reducer action - accept friends wannabees", action);
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
        // console.log("reducer action - unfriend wannabees", action);
        return {
            ...state,
            friendsWannabes: state.friendsWannabes.filter(
                user => !(user.id == action.endUserId)
            )
        };
    }
    if (action.type === "ALL_CHAT_MESSAGES") {
        return { ...state, allChatMessages: action.allChatMessages };
    }
    if (action.type === "CHAT_MESSAGE") {
        // console.log("reducer action - CHAT_MESSAGE", action);
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
