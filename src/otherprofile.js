//otherprofile.js
import React from "react";
import axios from "./axios";
import { Profilepic } from "./profilepic";
import { Friendbutton } from "./friendbutton";

export class Otherprofile extends React.Component {
    constructor(props) {
        console.log("OTHER PROFILE > PROPS", props);
        super(props);
        this.state = {};
    }
    componentDidMount() {
        axios
            .get(`/otheruser/${this.props.match.params.id}`)
            .then(({ data }) => {
                if (data.success) {
                    this.setState(data);
                    console.log("state ", this.state);
                } else {
                    this.props.history.push("/");
                }
            })
            .catch(err => console.log(err));
        console.log("success: false");
    }
    render() {
        return (
            <React.Fragment>
                <div className="pageContainer">
                    <h1 className="h5_header">Other Profiles</h1>
                    <div className="otherprofileContainer">
                        <div className="mainImageProfile">
                            <Profilepic
                                imageUrl={
                                    this.state.profilepicture ||
                                    "/images/default.svg"
                                }
                            />
                        </div>
                        <h3 className="userName p_bodyText otherprofileHeader">
                            <bold>User &#x23;{this.state.id} </bold>
                            <span>
                                {this.state.first} {this.state.last}
                            </span>
                            <div className="mainLine" />
                        </h3>
                        <div className="bioInfo">
                            <h3 className="Personal_header">BRIEF BIO</h3>
                            <p className="p_bodyText bioTextHolder">
                                {this.state.bioinfo}
                            </p>

                            <Friendbutton
                                otheruserid={this.props.match.params.id}
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
