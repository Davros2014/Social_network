import React from "react";
import axios from "../axios";

export default class Deleteaccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.delete = this.delete.bind(this);
    }

    delete() {
        axios.post("/deleteaccount").then(response => {
            console.log(response);
            location.replace("/welcome");
        });
    }

    render() {
        return (
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
                        style={{ height: "10rem" }}
                        id="delete-icon"
                        src="/images/sad_face.svg"
                        alt=""
                    />
                </div>
                <button className="buttonBasic" onClick={this.delete}>
                    Delete Account
                </button>
            </div>
        );
    }
}
