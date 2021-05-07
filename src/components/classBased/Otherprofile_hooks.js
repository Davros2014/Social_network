//otherprofile.js
import React, { useEffect } from "react";
import axios from "../axios";
import Profilepicture from "./Profilepicture";
import Friendbutton from "./Friendbutton";
import PageContainer from "./PageContainer";

const Otherprofile = props => {
    // componentDidMount() {
    //     axios
    //         .get(`/otheruser/${props.match.params.id}`)
    //         .then(({ data }) => {
    //             if (data.success) {
    //                 this.setState(data);
    //                 console.log("state ", this.state);
    //             } else {
    //                 this.props.history.push("/");
    //             }
    //         })
    //         .catch(err => console.log(err));
    //     console.log("success: false");
    // }
    useEffect(() => {
        axios
            .get(`/otheruser/${props.match.params.id}`)
            .then(({ data }) => {
                if (data.success) {
                    // this.setState(data);
                    console.log("props ", props);
                } else {
                    props.history.push("/");
                }
            })
            .catch(err => console.log(err));
        console.log("success: false");
    });
    const { profilepicture } = props;
    // console.log("state in friendiess profiles", this.state);
    return (
        <PageContainer>
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
                    <strong>User &#x23;{this.state.id} </strong>
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

                    <Friendbutton otheruserid={this.props.match.params.id} />
                </div>
            </div>
        </PageContainer>
    );
};
export default Otherprofile;
