//otherprofile.js
import React from "react";
import axios from "../axios";
import Profilepicture from "./Profilepicture";
import Friendbutton from "./Friendbutton";
import PageContainer from "./PageContainer";
import PageWrapper from "./PageWrapper";

export default class Otherprofile extends React.Component {
    constructor(props) {
        // console.log("OTHER PROFILE > PROPS", props);
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
        const { profilepicture } = this.state;
        console.log("state in friends profiles", this.state);
        return (
            <PageContainer>
                <PageWrapper>
                    <h1 className="h5_header">Friend Profiles</h1>
                    <div className="otherprofileContainer">
                        <div className="mainImageProfile">
                            <Profilepicture
                                profilepictureurl={
                                    profilepicture || "/images/default.svg"
                                }
                            />
                        </div>
                        <h3 className="userName p_bodyText otherprofileHeader">
                            <strong>User &#x23;{this.state.id - 1} </strong>
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
                </PageWrapper>
            </PageContainer>
        );
    }
}
