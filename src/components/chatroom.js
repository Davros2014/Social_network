import React, { Component, createRef } from "react";

import { connect } from "react-redux";
import { allChatMessages, chatMessage } from "../actions/actions";
import { socket } from "../socket";

import PageContainer from "./PageContainer";
import PageWrapper from "./PageWrapper";

class Chatroom extends Component {
    constructor(props) {
        super(props);
        this.state = { disabled: true, chatroom: [] };
        this.elemRef = createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInput({ target }) {
        this.setState({ chatroom: target.value });
        target.value.length > 0
            ? this.setState({ disabled: false })
            : this.setState({ disabled: true });
    }
    handleSubmit(e) {
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
        const { disabled, chatroom } = this.state;
        return (
            <PageContainer>
                <PageWrapper>
                    <>
                        <h2 className="h2_headers">Message Board</h2>
                        <section id="MessageBoardContainer">
                            <div className="chatContainer" ref={this.elemRef}>
                                {!chatroom.length && !allMessages && (
                                    <p className="h2_headers">
                                        Be the first to send a message to
                                        everyone here
                                    </p>
                                )}
                                {allMessages &&
                                    allMessages.map(chatroom => (
                                        <div
                                            className="chatItem"
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
                                                        User&#x23;
                                                        {chatroom.user_id}
                                                        <strong>
                                                            {chatroom.first}
                                                            {chatroom.last}
                                                        </strong>
                                                        commented @
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
                                    placeholder="Tell us something..."
                                    className="chatInputField"
                                    id="output"
                                    name="chatinfo"
                                    onChange={e => this.handleInput(e)}
                                    type="text"
                                />
                                <button
                                    onClick={this.handleSubmit}
                                    id="submitMessage"
                                    type="reset"
                                    value="Reset"
                                    className={`messagingSubmit ${
                                        disabled ? "disabled" : ""
                                    } `}
                                    disabled={disabled ? true : false}
                                >
                                    {disabled ? (
                                        <i className="fas fa-ban"></i>
                                    ) : (
                                        <i
                                            className="fa fa-paper-plane"
                                            aria-hidden="true"
                                        ></i>
                                    )}
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
