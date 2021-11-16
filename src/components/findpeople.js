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
    const [findPeopleError, setFindPeopleError] = useState(false);

    const findPeopleRegex = e => {
        setName(e.target.value);
    };
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
            .catch(err => {
                setFindPeopleError(true);
                console.log(err);
            });
    }, [name]);
    return (
        <PageContainer>
            <PageWrapper>
                <h2 className="h2_headers">Find People</h2>
                <p className="p_bodyTextMain subheader">
                    Hello, <span>{first}</span> find other Zero° users
                </p>
                <input
                    type="text"
                    name="name"
                    className="findPeople"
                    value={name}
                    onChange={findPeopleRegex}
                    placeholder="Search for friends"
                />

                <div id="findPeopleContainer">
                    {!name && <h2 className="h2_headers">Some recent users</h2>}
                    {!user.length && name ? (
                        <>
                            <p className="nofriends">
                                No users founds by those search parameters,
                                please try with different search results
                            </p>
                            <button
                                className="smallButtonBasic clearBtn"
                                onClick={() => setName("")}
                            >
                                Clear
                            </button>
                        </>
                    ) : (
                        <div className="friendsContainer">
                            {user.length &&
                                user.map(user => (
                                    <div className="friendsCard" key={user.id}>
                                        <Link to={`/user/${user.id}`}>
                                            <Profilepicture
                                                profilepictureurl={
                                                    user.profilepictureurl
                                                }
                                            />
                                        </Link>
                                        <p className="friendsNameHeader">
                                            {user.first} {user.last}
                                        </p>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            </PageWrapper>
        </PageContainer>
    );
};
export default Findpeople;
