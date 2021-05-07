import React from "react";

const Profile = props => {
    const { bio, profilepic } = props;
    return (
        <div className="pageContainer">
            <h5 className="h5_header">Your profile</h5>
            <div className="profileContainer">
                <div className="mainImageProfile">{profilepic}</div>
                <div className="bioContainer">{bio}</div>
            </div>
        </div>
    );
};
export default Profile;
