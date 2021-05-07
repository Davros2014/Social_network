// FROM HOT OR NOT EG
import React, { useRef, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { allChatMessages, chatMessage } from "../actions/actions";
import { socket } from "../socket";
import PageContainer from "./PageContainer";

const Chatroom = props => {
    // constructor(props) {
    //     super(props);
    //     this.state = { disabled: true, chatroom: [] };
    //     const elemRef = createRef();
    // }

    const [disabled, setDisabled] = useState(true);
    const elemRef = useRef();

    const handleInput = ({ target }) => {
        this.setState({ chatroom: target.value });
    };
    const handleSubmit = () => {
        console.log("bang, bang, click, click: ", this.state.chatroom);
        socket.emit("chatMessage", this.state.chatroom);
        document.getElementById("output").value = "";
    };

    useEffect(() => {
        elemRef.current.scrollTop = elemRef.current.scrollHeight;
        return () => {
            elemRef.current.scrollTop = elemRef.current.scrollHeight;
        };
    }, []);

    const { allMessages, bioinfo } = props;
    return (
        <PageContainer>
            <h2 className="h5_header">Message Board</h2>
            <div className="chatContainer" ref={elemRef}>
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
                                        commented on {chatroom.created_at}
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
                        onChange={e => handleInput(e)}
                        type="text"
                    />
                    {!disabled ? (
                        <button className="buttonBasic chatinfoSave">
                            Disabled
                        </button>
                    ) : (
                        <button
                            onClick={e => {
                                handleSubmit(e);
                            }}
                            id="clear"
                            type="reset"
                            value="Reset"
                            className="buttonBasic chatinfoSave"
                        >
                            Send
                        </button>
                    )}
                </div>
            </div>
        </PageContainer>
    );
};

const mapStateToProps = function(state) {
    // console.log("state", state);
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
