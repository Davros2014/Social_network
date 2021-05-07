import React from "react";
import axios from "../axios";
import PageContainer from "./PageContainer";

const Deleteaccount = () => {
    const deleteAccount = () => {
        axios.post("/deleteaccount").then(response => {
            console.log(response);
            location.replace("/welcome");
        });
    };
    return (
        <PageContainer>
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
                    <img
                        style={{ height: "15rem" }}
                        id="delete-icon"
                        src="/images/sad_face.svg"
                        alt=""
                    />
                </div>
                <button className="buttonBasic" onClick={deleteAccount}>
                    Delete Account
                </button>
            </div>
        </PageContainer>
    );
};
export default Deleteaccount;
