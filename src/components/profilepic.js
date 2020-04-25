import React from "react";

export function Profilepic(props) {
    console.log("profilepic props", props);
    const { clickHandler, profilepictureurl, first, last } = props;
    return (
        <img
            className="userProfilePic"
            onClick={clickHandler}
            src={profilepictureurl ? profilepictureurl : "/images/default.svg"}
            alt={`${first} ${last}`}
        />
    );
}
