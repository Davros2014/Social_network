import React, { Fragment, useEffect, useState } from "react";
import axios from "./axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// components
import Profilepicture from "./components/Profilepicture";
import Profile from "./components/Profile";
import Bio from "./components/Bio";
import Otherprofile from "./components/Otherprofile";
import Findpeople from "./components/Findpeople";
import DeleteAccount from "./components/Deleteaccount";
import NavBar from "./components/NavBar";
import Friends from "./components/Friends";
import Chatroom from "./components/Chatroom";
import Loader from "./components/Loader";

const App = () => {
    const [loading, setLoading] = useState(true);
    const [viewable, setViewable] = useState(false);
    const [uploaderVisible, setUploaderVisible] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userInfo, setUserInfo] = useState({
        first: "",
        last: "",
        id: "",
        profilepictureurl: "",
        email: "",
        bioinfo: ""
    });
    const { first, last, id, profilepictureurl, email, bioinfo } = userInfo;
    useEffect(() => {
        axios
            .get("/user")
            .then(({ data }) => {
                const {
                    first,
                    last,
                    id,
                    profilepictureurl,
                    email,
                    bioinfo
                } = data;
                setUserInfo({
                    first,
                    last,
                    id,
                    profilepictureurl,
                    email,
                    bioinfo
                });
                setLoading(false);
            })
            .catch(err => console.log(err));
    }, []);

    const setBio = newInfo =>
        setUserInfo(userInfo => ({
            ...userInfo,
            bioinfo: newInfo
        }));
    const setProfilepictureurl = profilepictureurl => {
        setUserInfo(userInfo => ({
            ...userInfo,
            profilepictureurl: profilepictureurl
        }));
    };
    const handleUploader = () => {
        setUploaderVisible(!uploaderVisible);
    };
    const showEditMode = () => {
        setViewable(!viewable);
    };
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Router class="mainHtmlContainer">
                    <Fragment>
                        <NavBar
                            userInfo={userInfo}
                            first={first}
                            last={last}
                            profilepictureurl={profilepictureurl}
                            showEditMode={showEditMode}
                            handleUploader={handleUploader}
                            uploaderVisible={uploaderVisible}
                            setProfilepictureurl={setProfilepictureurl}
                            setUploaderVisible={setUploaderVisible}
                        />
                        <Switch>
                            <Route
                                exact
                                path="/"
                                render={() => (
                                    <Profile
                                        loading={loading}
                                        profilepic={
                                            <Profilepicture
                                                profilepictureurl={
                                                    profilepictureurl
                                                }
                                                userInfo={userInfo}
                                                handleUploader={handleUploader}
                                            />
                                        }
                                        bio={
                                            <Bio
                                                userInfo={userInfo}
                                                bioinfo={bioinfo}
                                                setBio={setBio}
                                                first={first}
                                                last={last}
                                                viewable={viewable}
                                                showEditMode={showEditMode}
                                                setShowDeleteModal={
                                                    setShowDeleteModal
                                                }
                                                showDeleteModal={
                                                    showDeleteModal
                                                }
                                            />
                                        }
                                        handleUploader={handleUploader}
                                    />
                                )}
                            />
                            <Route
                                exact
                                path="/user/:id"
                                render={props => (
                                    <Otherprofile
                                        key={props.match.url}
                                        match={props.match}
                                        history={props.history}
                                    />
                                )}
                            />
                            <Route
                                exact
                                path="/users"
                                render={() => (
                                    <Findpeople
                                        first={first}
                                        profilepictureurl={profilepictureurl}
                                    />
                                )}
                            />
                            <Route
                                exact
                                path="/friends"
                                render={() => <Friends />}
                            />
                            <Route
                                exact
                                path="/chatroom"
                                render={() => <Chatroom id={id} />}
                            />
                            <Route
                                exact
                                path="/deleteaccount"
                                render={() => (
                                    <DeleteAccount id={id} first={first} />
                                )}
                            />
                        </Switch>
                    </Fragment>
                </Router>
            )}
        </Fragment>
    );
};
export default App;
