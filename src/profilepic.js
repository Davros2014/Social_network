import React from "react";

export function Profilepic(props) {
    console.log("PROFILEPIC imageUrl", props);
    const { clickHandler, imageUrl, first, last } = props;
    return (
        <img
            className="userProfilePic"
            onClick={clickHandler}
            src={imageUrl ? imageUrl : "/images/default.svg"}
            alt={`${first} ${last}`}
        />
    );
}
