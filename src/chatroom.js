// FROM HOT OR NOT EG
import React from "react";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { allChatMessages, chatMessage } from "./actions";
import { socket } from "./socket";

class Chatroom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.elemRef = React.createRef();
    }
    handleInput({ target }) {
        this.state.chatroom = target.value;
    }
    handleSubmit() {
        console.log("bang, bang, click, click: ", this.state.chatroom);
        socket.emit("chatMessage", this.state.chatroom);
        document.getElementById("output").value = "";
    }
    componentDidUpdate() {
        this.elemRef.current.scrollTop = this.elemRef.current.scrollHeight;
    }
    // componentDidMount() {
    //     console.log("/////state in CHATROOM ", this.state);
    //     console.log("this.props.allChatMessages", this.props.allChatMessages);
    //     this.props.dispatch(allChatMessages());
    //     console.log("////this.props", this.props);
    // }
    render() {
        const { allMessages, bioinfo } = this.props;
        return (
            <React.Fragment>
                <div className="pageContainer">
                    <h2 className="h5_header">Message Board</h2>
                    <div className="chatContainer" ref={this.elemRef}>
                        {allMessages &&
                            allMessages.map(chatroom => (
                                <div className="chatItem" key={chatroom.id}>
                                    <img
                                        className="userProfilePic"
                                        src={
                                            chatroom.profilepictureurl ||
                                            "/images/default.svg"
                                        }
                                        alt=""
                                    />
                                    <div className="chatDetails">
                                        <div className="chatHeader">
                                            <div className="chatInfo">
                                                User&#x23; {chatroom.user_id}{" "}
                                                {chatroom.first} {chatroom.last}{" "}
                                                commented on{" "}
                                                {chatroom.created_at}
                                            </div>
                                        </div>
                                        <div className="h4_header">
                                            <p className="h4_header chatMessage">
                                                {chatroom.messages}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                    <div className="chatInputField">
                        <div className="messaging_container">
                            <textarea
                                ref="chatroom_editor"
                                spellCheck="false"
                                defaultValue={bioinfo}
                                className="chatEditor"
                                id="output"
                                name="chatinfo"
                                onChange={e => this.handleInput(e)}
                                type="text"
                            />
                            <button
                                onClick={e => {
                                    this.handleSubmit(e);
                                }}
                                id="clear"
                                type="reset"
                                value="Reset"
                                className="buttonBasic chatinfoSave"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = function(state) {
    console.log("state", state);
    return {
        allMessages:
            state.allChatMessages &&
            state.allChatMessages.filter(messages => {
                return (messages.created_at = new Date(
                    messages.created_at
                ).toLocaleString(`en`, { hour12: false }));
            })
    };
};

export default connect(mapStateToProps)(Chatroom);
