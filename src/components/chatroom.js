// FROM HOT OR NOT EG
import React from "react";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { allChatMessages, chatMessage } from "../actions/actions";
import { socket } from "../socket";
import PageContainer from "./PageContainer";
import PageWrapper from "./PageWrapper";

class Chatroom extends React.Component {
    constructor(props) {
        super(props);
        this.state = { disabled: true, chatroom: [] };
        this.elemRef = React.createRef();
    }
    handleInput({ target }) {
        this.setState({ chatroom: target.value });
        target.value.length > 0
            ? this.setState({ disabled: false })
            : this.setState({ disabled: true });
    }
    handleSubmit() {
        console.log("bang, bang, click, click: ", this.state.chatroom);
        socket.emit("chatMessage", this.state.chatroom);
        document.getElementById("output").value = "";
    }
    componentDidMount() {
        this.elemRef.current.scrollTop = this.elemRef.current.scrollHeight;
    }
    componentDidUpdate() {
        this.elemRef.current.scrollTop = this.elemRef.current.scrollHeight;
    }
    render() {
        const { allMessages, id } = this.props;
        console.log("id", id);
        const { disabled } = this.state;
        return (
            <PageContainer>
                <PageWrapper>
                    <>
                        <h2 className="h2_headers">Message Board</h2>

                        <section id="MessageBoardContainer">
                            <div className="chatContainer" ref={this.elemRef}>
                                {allMessages &&
                                    allMessages.map(chatroom => (
                                        <div
                                            className={`chatItem ${
                                                chatroom.id !== id
                                                    ? "rightAlign"
                                                    : ""
                                            } `}
                                            key={chatroom.id}
                                        >
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
                                                        User&#x23;{" "}
                                                        {chatroom.user_id}{" "}
                                                        {chatroom.first}{" "}
                                                        {chatroom.last}{" "}
                                                        commented @{" "}
                                                        {chatroom.created_at}
                                                    </div>
                                                </div>
                                                <div className="h4_headers">
                                                    <p className="h4_headers chatMessage">
                                                        {chatroom.messages}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>

                            <div className="messageInputContainer">
                                <textarea
                                    spellCheck="false"
                                    placholder="We're waiting to hear all about it..."
                                    className="chatInputField"
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
                                    className={`messagingSubmit ${
                                        disabled ? "disabled" : ""
                                    } `}
                                    disabled={disabled ? true : false}
                                >
                                    {disabled ? "Disabled" : "Send"}
                                </button>
                            </div>
                        </section>
                    </>
                </PageWrapper>
            </PageContainer>
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
