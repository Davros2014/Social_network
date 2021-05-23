import React from "react";
import PageWrapper from "./PageWrapper";
import PageContainer from "./PageContainer";

const Profile = ({ bio, profilepic }) => {
    return (
        <PageContainer>
            <PageWrapper>
                <h2 className="h2_headers">Your profile</h2>
                <div className="profileContainer">
                    <div className="mainImageProfile">{profilepic}</div>
                    <div className="bioContainer">{bio}</div>
                </div>
            </PageWrapper>
        </PageContainer>
    );
};
export default Profile;
