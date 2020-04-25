import React, { Component, Fragment } from "react";
import axios from "./axios";
import { Profilepic } from "./components/profilepic";
import { Profile } from "./components/profile";
import { Bio } from "./components/bio";

import { Otherprofile } from "./components/otherprofile";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Findpeople } from "./components/findpeople";
import { Deleteaccount } from "./components/deleteaccount";
// import NavBar from "./components/NavBar";
// import { Logo } from "./components/logo";
// import { Uploader } from "./components/uploader";
import NavBar from "./components/NavBar";

// import { Link } from "react-router-dom";

import Friends from "./components/friends";
import Chatroom from "./components/chatroom";

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderVisible: false,
            viewable: false,
            loading: true
        };
        this.setBio = this.setBio.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
        this.showEditMode = this.showEditMode.bind(this);
    }
    componentDidMount() {
        axios
            .get("/user")
            .then(({ data }) => {
                this.setState(data);
                console.log("this.state.id", this.state.id);
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
    clickHandler() {
        this.state.uploaderVisible
            ? this.setState({ uploaderVisible: false })
            : this.setState({ uploaderVisible: true });
    }
    showEditMode() {
        this.state.viewable
            ? this.setState({ viewable: false })
            : this.setState({ viewable: true });
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
            uploaderVisible,
            loading
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
                            uploaderVisible={uploaderVisible}
                            clickHandler={this.clickHandler}
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
                                                clickHandler={this.clickHandler}
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
                                path="/users"
                                render={() => (
                                    <Findpeople
                                        first={first}
                                        profilepictureurl={profilepictureurl}
                                    />
                                )}
                            />
                            <Route path="/friends" render={() => <Friends />} />
                            <Route
                                path="/chatroom"
                                render={() => <Chatroom />}
                            />
                            <Route
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
