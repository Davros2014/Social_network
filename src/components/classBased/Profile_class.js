import React from "react";
import Profilepicture from "./Profilepicture";

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        // console.log("state check in profile component", this.props);
        const { bio, profilepic, handleUploader } = this.props;
        if (!this.props) {
            return (
                <div className="loader">
                    <img className="loader_logo" src="/images/zero_logo.svg" />
                </div>
            );
        }
        return (
            <React.Fragment>
                <div className="pageContainer">
                    <h5 className="h5_header">Your profile</h5>
                    <div className="profileContainer">
                        <div className="mainImageProfile">
                            {profilepic || "/images/default.svg"}
                        </div>
                        <div className="bioContainer">{bio}</div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
