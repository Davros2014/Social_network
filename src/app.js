import React, { Component, Fragment } from "react";
import axios from "./axios";
import { Profilepic } from "./profilepic";
import { Uploader } from "./uploader";
import { Logo } from "./logo";
import { Profile } from "./profile";
import { Bio } from "./bio";
import { Nav } from "./nav";

import { Otherprofile } from "./otherprofile";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Findpeople } from "./findpeople";
import { Deleteaccount } from "./deleteaccount";

import Friends from "./friends";
import Chatroom from "./chatroom";

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = { uploaderVisible: false };
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
    }
    // see Bio.js for update info
    setBio(newBio) {
        this.setState({
            bioinfo: newBio
        });
    }
    clickHandler() {
        this.state.uploaderVisible == true
            ? this.setState({ uploaderVisible: false })
            : this.setState({ uploaderVisible: true });
    }
    showEditMode() {
        this.state.viewable == true
            ? this.setState({ viewable: false })
            : this.setState({ viewable: true });
    }
    render() {
        const {
            first,
            last,
            id,
            profilepictureurl,
            email,
            bioinfo,
            uploaderVisible
        } = this.state;
        if (!id) {
            return <p>Page is loading!</p>;
        } else {
            return (
                <Router>
                    <Fragment>
                        <nav className="topNav">
                            <div className="navWrapper">
                                <Link to="/">
                                    <Logo />
                                </Link>
                                <div className="navDetails">
                                    <Nav />
                                    <div className="navPicContainer">
                                        <Profilepic
                                            onClick={this.clickHandler}
                                            className="profilePic"
                                            imageUrl={
                                                profilepictureurl ||
                                                "/images/default.svg"
                                            }
                                            clickHandler={e =>
                                                this.setState({
                                                    uploaderVisible: true,
                                                    introVisible: false
                                                })
                                            }
                                        />
                                        <p className="welcome">
                                            Welcome, <span>{first}</span>
                                        </p>
                                    </div>
                                </div>
                                {this.state.uploaderVisible && (
                                    <Uploader
                                        upDateImage={img =>
                                            this.setState({
                                                profilepictureurl: img,
                                                uploaderVisible: false
                                            })
                                        }
                                    />
                                )}
                            </div>
                        </nav>

                        <Fragment>
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
                                                imageUrl={profilepictureurl}
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
                                render={() => <Findpeople first={first} />}
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
                        </Fragment>
                    </Fragment>
                </Router>
            );
        }
    } // close render
} // app close
