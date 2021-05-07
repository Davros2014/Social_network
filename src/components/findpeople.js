import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import Profilepicture from "./Profilepicture";
import axios from "../axios";

export default function Findpeople(props) {
    const [user, setUser] = useState([]);
    const [name, setName] = useState("");

    useEffect(() => {
        let abort;
        axios
            .get("/findusers", {
                params: {
                    name: name
                }
            })
            .then(response => {
                if (!abort) {
                    setUser(response.data.user);
                    return () => {
                        abort = true;
                    };
                }
            })
            .catch(err => console.log(err));
    }, [name]);
    if (!user.length < 0) {
        return (
            <div className="loader">
                <img className="loader_logo" src="/images/zero_logo.svg" />
            </div>
        );
    }
    return (
        <React.Fragment>
            <div className="pageContainer">
                <h5 className="h5_header">Find People</h5>
                <p className="p_bodyTextMain subheader">
                    Hello, <span>{props.first}</span> find other Zero° users
                </p>
                <input
                    type="text"
                    name="name"
                    className="findPeople"
                    onChange={e => setName(e.target.value)}
                    defaultValue="Search for friends"
                />
                <div id="findPeopleContainer">
                    <div className="friendsEtcContainer">
                        {user.length &&
                            user.map(user => (
                                <div
                                    className="friendsEtcWrapper"
                                    key={user.id}
                                >
                                    <Link to={`/user/${user.id}`}>
                                        <Profilepicture
                                            profilepictureurl={
                                                user.profilepictureurl
                                            }
                                        />
                                    </Link>
                                    <p className="h5_header friendsEtcText">
                                        {user.first} {user.last}
                                    </p>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
