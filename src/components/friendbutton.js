import React, { useState, useEffect } from "react";
import axios from "../axios";

export default function Friendbutton(props) {
    const [buttonName, setButtonName] = useState("_");

    const submit = () => {
        // send friend request
        if (buttonName === "Send Friend Request") {
            // console.log("FRIEND BUTTON - props.otheruserid", props.otheruserid);
            axios
                .post("/sendfriendrequest", {
                    // to send to post route in req.body
                    otheruserid: props.otheruserid,
                    buttonName: buttonName
                })
                .then(results => {
                    setButtonName(results.data.buttonName);
                })
                .catch(err => {
                    console.log(err);
                });
        }
        // accept friend request
        if (buttonName === "Accept Friend Request") {
            axios
                .post("/acceptfriendship", {
                    otheruserid: props.otheruserid,
                    buttonName: buttonName
                })
                .then(results => {
                    setButtonName(results.data.buttonName);
                })
                .catch(err => {
                    console.log(err);
                });
        }
        // delete/unfriend user
        if (
            buttonName === "Cancel Friend Request" ||
            buttonName === "Unfriend User"
        ) {
            axios
                .post("/deletefriends", {
                    otheruserid: props.otheruserid,
                    buttonName: buttonName
                })
                .then(results => {
                    setButtonName(results.data.buttonName);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };

    // when page mounts > checkfriendstatus
    useEffect(() => {
        const { otheruserid } = props;
        axios
            .get("/checkFriendStatus/" + otheruserid)
            .then(results => {
                // console.log("//// RESULTS in checkfriendstatus", results);
                setButtonName(results.data.buttonName);
                // console.log("DATA DATA DATA", results.data.buttonName);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <button className="smallButtonBasic friendButton" onClick={submit}>
            {buttonName}
        </button>
    );
}
