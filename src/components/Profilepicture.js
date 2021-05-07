import React from "react";

export default function Profilepicture(props) {
    // console.log("profilepic props", props);
    const { clickHandler, profilepictureurl, handleClick, first, last } = props;
    return (
        <img
            className="userProfilePic"
            onClick={handleClick}
            src={profilepictureurl ? profilepictureurl : "/images/default.svg"}
            alt={`${first} ${last}`}
        />
    );
}
