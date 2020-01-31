import React from "react";

export function Profilepic(props) {
    console.log("PROFILEPIC imageUrl", props);
    return (
        <img
            className="userProfilePic"
            onClick={props.clickHandler}
            src={props.imageUrl ? props.imageUrl : "/images/default.svg"}
            alt={`${props.first} ${props.last}`}
        />
    );
}
