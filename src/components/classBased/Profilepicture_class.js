import React from "react";

export default function Profilepicture(props) {
    // console.log("profilepic props", props);
    const { handleUploader, profilepictureurl, first, last } = props;
    return (
        <img
            className="userProfilePic"
            onClick={handleUploader}
            src={profilepictureurl ? profilepictureurl : "/images/default.svg"}
            alt={`${first} ${last}`}
        />
    );
}
