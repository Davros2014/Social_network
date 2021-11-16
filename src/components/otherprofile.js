//otherprofile.js
import React, { Component } from "react";
import axios from "../axios";

//component
import Profilepicture from "./Profilepicture";
import Friendbutton from "./Friendbutton";
import PageContainer from "./PageContainer";
import PageWrapper from "./PageWrapper";

import { Link } from "react-router-dom";

export default class Otherprofile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    previous = () => {
        let params = this.props.match.params.id;
        let previousparams = Number(params) - 1;
        previousparams < 0
            ? this.props.history.push(`/user/205`)
            : this.props.history.push(`/user/${previousparams}`);
    };
    next = () => {
        let params = this.props.match.params.id;
        let nextparams = Number(params) + 1;
        nextparams > 205
            ? this.props.history.push(`/user/1`)
            : this.props.history.push(`/user/${nextparams}`);
    };

    componentDidMount() {
        axios
            .get(`/otheruser/${this.props.match.params.id}`)
            .then(({ data }) => {
                if (data.success) {
                    this.setState(data);
                } else {
                    this.props.history.push("/");
                }
            })
            .catch(err => console.log(err));
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
                    <div className="btnContainerRow friendProfilesBtn">
                        <button
                            className="smallButtonBasic backBtn prevBtn"
                            onClick={this.previous}
                        >
                            <i className="fas fa-angle-left"></i>
                        </button>
                        <Link className="smallButtonBasic backBtn" to="/users">
                            Go back
                        </Link>
                        <button
                            className="smallButtonBasic backBtn nextBtn"
                            onClick={this.next}
                        >
                            <i className="fas fa-angle-right"></i>
                        </button>
                    </div>
                </PageWrapper>
            </PageContainer>
        );
    }
}
