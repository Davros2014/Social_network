import React from "react";
import axios from "../axios";

export class Deleteaccount extends React.Component {
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
            <div className="delete">
                <div className="deleteIcon">
                    <h2>Do you really want to leave us?</h2>
                    <img id="delete-icon" src="/images/sad_face.svg" alt="" />
                </div>
                <button className="buttonBasic" onClick={this.delete}>
                    Delete Account
                </button>
            </div>
        );
    }
}
