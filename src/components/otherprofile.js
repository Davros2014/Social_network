//otherprofile.js
import React from "react";
import axios from "../axios";
import Profilepicture from "./Profilepicture";
import Friendbutton from "./Friendbutton";
import PageContainer from "./PageContainer";
import PageWrapper from "./PageWrapper";

export default class Otherprofile extends React.Component {
    constructor(props) {
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
        const { profilepicture, first, last, id, bioinfo } = this.state;
        return (
            <PageContainer>
                <PageWrapper>
                    <h2 className="h2_headers">Friend Profiles</h2>

                    <div className="profileContainer">
                        <div className="generalProfileImage">
                            <Profilepicture
                                profilepictureurl={
                                    profilepicture || "/images/default.svg"
                                }
                            />
                        </div>
                        <div className="bioContainer">
                            <h3 className="h3_headers infoHeader">
                                Personal Information
                            </h3>
                            <h5 className="bioSubHead">
                                User &#x23;{id - 1}
                                <br />
                                <span>
                                    {first} {last}
                                </span>
                            </h5>
                            <div className="bioInfo">
                                <h5 className="bioSubHead">Short Bio: </h5>
                                <p className="p_bodyText bioInfoText">
                                    {bioinfo}
                                </p>

                                <Friendbutton
                                    otheruserid={this.props.match.params.id}
                                />
                            </div>
                        </div>
                    </div>
                </PageWrapper>
            </PageContainer>
        );
    }
}
