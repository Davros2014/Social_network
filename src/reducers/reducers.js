// reducers.js

export default function reducer(state = {}, action) {
    if (action.type === "RECEIVE_FRIENDS_WANNABES") {
        // reducer action - friends wannabees
        return { ...state, friendsWannabes: action.friendsWannabes };
    }

    if (action.type === "ACCEPT_FRIEND_REQUEST") {
        // reducer action - accept friends wannabees
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
        // reducer action - unfriend wannabees
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
        // reducer action - CHAT_MESSAGE
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
