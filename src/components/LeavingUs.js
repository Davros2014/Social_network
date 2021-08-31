import React from "react";
import axios from "../axios";

import ModalBackground from "./ModalBackground";

const LeavingUs = ({ showDeleteModal, setShowDeleteModal, first, id }) => {
    const deleteUser = () => {
        axios
            .post("/deleteaccount", id)
            .then(() => {
                location.replace("/welcome");
            })
            .catch(error => {
                console.log(error);
            });
    };
    return (
        <ModalBackground>
            <div
                className={`modalContainer deleteUserContainer ${
                    showDeleteModal ? "active" : "remove"
                } `}
            >
                <div className="innerModal">
                    <h2 className="h2_headers deleteIcon">
                        Do you really want to leave us?
                    </h2>
                    <p className="p_bodyTextMain">
                        We&apos;d love you to reconsider and stay as part of the
                        Zero° community, we appreciate all our members, but if
                        you want to leave, with some sadness we will wish you a
                        fond farewell {first}, but remember the door will always
                        be open to you...
                    </p>
                    <img
                        id="deleteIcon"
                        src="/images/the_door.svg"
                        alt="door"
                    />
                </div>
                <div className="btnContainerRow">
                    <button
                        className="buttonBasic leavingBtn"
                        onClick={() => setShowDeleteModal(false)}
                    >
                        Stay
                    </button>

                    <button
                        className="buttonBasic leavingBtn"
                        onClick={deleteUser}
                    >
                        Leave
                    </button>
                </div>
            </div>
        </ModalBackground>
    );
};
export default LeavingUs;
