import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "../axios";

//components
import Profilepicture from "./Profilepicture";
import PageContainer from "./PageContainer";
import PageWrapper from "./PageWrapper";
import Loader from "./Loader";

const Findpeople = ({ first }) => {
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
    return (
        <PageContainer>
            {!user.length < 0 ? (
                <Loader />
            ) : (
                <PageWrapper>
                    <h2 className="h2_headers">Find People</h2>
                    <p className="p_bodyTextMain subheader">
                        Hello, <span>{first}</span> find other Zero° users
                    </p>
                    <input
                        type="text"
                        name="name"
                        className="findPeople"
                        onChange={e => setName(e.target.value)}
                        placeholder="Search for friends"
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
                </PageWrapper>
            )}
        </PageContainer>
    );
};
export default Findpeople;
