import React from "react";
import PageWrapper from "./PageWrapper";
import PageContainer from "./PageContainer";
import Loader from "./Loader";

const Profile = ({ bio, profilepic, loading }) => {
    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <PageContainer>
                    <PageWrapper>
                        <h2 className="h2_headers">Your profile</h2>
                        <div className="profileContainer">
                            <div
                                id="personalProfile"
                                className="generalProfileImage "
                            >
                                {profilepic}
                            </div>
                            <div className="bioContainer">{bio}</div>
                        </div>
                    </PageWrapper>
                </PageContainer>
            )}
        </>
    );
};
export default Profile;
