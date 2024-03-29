import React from "react";

const Profilepicture = ({ handleUploader, profilepictureurl, first, last }) => {
    return (
        <img
            className="userProfilePic"
            onClick={handleUploader}
            src={profilepictureurl ? profilepictureurl : "/images/default.svg"}
            alt={`${first} ${last}`}
        />
    );
};
export default Profilepicture;
