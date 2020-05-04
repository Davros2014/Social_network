import React, { Component, Fragment } from "react";
import axios from "./axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// components
import Profilepic from "./components/profilepic";
import Profile from "./components/Profile";
import { Bio } from "./components/bio";
import { Otherprofile } from "./components/otherprofile";
import { Findpeople } from "./components/findpeople";
import { Deleteaccount } from "./components/deleteaccount";
import NavBar from "./components/NavBar";
import Friends from "./components/friends";
import Chatroom from "./components/chatroom";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderVisible: false,
            viewable: false,
            loading: true
        };
        this.setBio = this.setBio.bind(this);
        this.handleUploader = this.handleUploader.bind(this);
        this.showEditMode = this.showEditMode.bind(this);
    }
    componentDidMount() {
        axios
            .get("/user")
            .then(({ data }) => {
                this.setState(data);
            })
            .catch(err => console.log(err));
        this.setState({
            loading: false
        });
    }
    // see Bio.js for update info
    setBio(newBio) {
        this.setState({
            bioinfo: newBio
        });
    }
    //open.close modal window
    handleUploader() {
        console.log("click, click - clickHandler", this.state.uploaderVisible);
        this.setState({
            uploaderVisible: !this.state.uploaderVisible
        });
    }
    showEditMode() {
        console.log("click, click - showeditMode", this.state.uploaderVisible);
        this.setState({ viewable: !this.state.viewable });
    }
    render() {
        console.log("state in app.js", this.state);
        const {
            first,
            last,
            id,
            profilepictureurl,
            email,
            bioinfo,
            loading,
            uploaderVisible
        } = this.state;
        if (loading) {
            return <p>Page is loading!</p>;
        } else {
            return (
                <Router>
                    <Fragment>
                        <NavBar
                            first={first}
                            last={last}
                            id={id}
                            profilepictureurl={profilepictureurl}
                            email={email}
                            bioinfo={bioinfo}
                            showEditMode={this.showEditMode}
                            handleUploader={this.handleUploader}
                            uploaderVisible={uploaderVisible}
                        />
                        <Switch>
                            <Route
                                exact
                                path="/"
                                render={() => (
                                    <Profile
                                        first={first}
                                        last={last}
                                        profilepic={
                                            <Profilepic
                                                id={id}
                                                first={first}
                                                last={last}
                                                profilepictureurl={
                                                    profilepictureurl
                                                }
                                                handleUploader={
                                                    this.handleUploader
                                                }
                                            />
                                        }
                                        bio={
                                            <Bio
                                                bioinfo={bioinfo}
                                                setBio={this.setBio}
                                                first={first}
                                                last={last}
                                                email={email}
                                            />
                                        }
                                        clickHandler={e =>
                                            this.setState({
                                                uploaderVisible: true,
                                                introVisible: false
                                            })
                                        }
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
                                render={() => <Chatroom />}
                            />
                            <Route
                                exact
                                path="/deleteaccount"
                                render={() => <Deleteaccount />}
                            />
                        </Switch>
                    </Fragment>
                </Router>
            );
        }
    } // close render
} // app close
