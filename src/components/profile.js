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
                        {profilepic && bio ? (
                            <div className="profileContainer">
                                <div
                                    id="personalProfile"
                                    className="generalProfileImage "
                                >
                                    {profilepic}
                                </div>
                                <div className="bioContainer">{bio}</div>
                            </div>
                        ) : (
                            <p>Nothing here</p>
                        )}
                    </PageWrapper>
                </PageContainer>
            )}
        </>
    );
};
export default Profile;
