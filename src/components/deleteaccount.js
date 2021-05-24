import React from "react";
import axios from "../axios";
import PageContainer from "./PageContainer";
import PageWrapper from "./PageWrapper";
import { Link } from "react-router-dom";

const DeleteAccount = ({ first }) => {
    const deleteUser = () => {
        axios.post("/deleteaccount").then(response => {
            console.log("error", response.error);
            console.log(response);
            location.replace("/welcome");
        });
    };

    return (
        <PageContainer>
            <PageWrapper>
                <div
                    style={{
                        height: "100vh",
                        display: "flex",
                        flexDirection: "column",
                        width: "100vw",
                        justifyContent: "center",
                        textAlign: "center",
                        alignItems: "center"
                    }}
                    className="delete"
                >
                    <div className="deleteIcon">
                        <h2>Do you really want to leave us?</h2>
                        <p
                            style={{
                                width: "50vw",
                                margin: "0 auto",
                                marginTop: "2rem",
                                marginBottom: "2rem",
                                textAlign: "center",
                                lineHeight: 1.5
                            }}
                        >
                            We&apos;d love you to reconsider and stay as part of
                            the Zero° community, we appreciate all our members,
                            but if you want to leave, with some sadness we will
                            wish you a fond farewell {first}, but remember the
                            door will always be open to you...
                        </p>
                        <img
                            style={{ height: "30rem", marginBottom: "2rem" }}
                            id="delete-icon"
                            src="/images/the_door.svg"
                            alt="door"
                        />
                    </div>
                    <div className="btnContainerRow">
                        <Link id="stayBtn" className="buttonBasic" to="/">
                            Stay
                        </Link>
                        <button className="buttonBasic" onClick={deleteUser}>
                            Leave
                        </button>
                    </div>
                </div>
            </PageWrapper>
        </PageContainer>
    );
};
export default DeleteAccount;
