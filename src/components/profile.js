import React from "react";
import PageWrapper from "./PageWrapper";
import PageContainer from "./PageContainer";

const Profile = ({ bio, profilepic }) => {
    // const { bio, profilepic } = props;
    return (
        <PageContainer>
            <PageWrapper>
                <h5 className="h5_header">Your profile</h5>
                <div className="profileContainer">
                    <div className="mainImageProfile">{profilepic}</div>
                    <div className="bioContainer">{bio}</div>
                </div>
            </PageWrapper>
        </PageContainer>
    );
};
export default Profile;
