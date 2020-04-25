import React, { Component, Fragment } from "react";
import { Logo } from "./logo";
import { Profilepic } from "./profilepic";
import { Uploader } from "./uploader";

import { Link } from "react-router-dom";

export default class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        console.log("bio props", this.props);
        const {
            uploaderVisible,
            introVisible,
            profilepictureurl,
            first
        } = this.props;
        return (
            <header className="topNav">
                <div className="navWrapper">
                    <Link to="/">
                        <Logo />
                    </Link>
                    <div className="navDetails">
                        <nav className="navLinkbar">
                            <Link className="navLink" to="/">
                                Profile
                            </Link>
                            <Link className="navLink" to="/users">
                                Find
                            </Link>
                            <Link className="navLink" to="/friends">
                                Friends
                            </Link>
                            <Link className="navLink" to="/chatroom">
                                Chat
                            </Link>
                            <a className="navLink" href="/logout">
                                Logout
                            </a>
                            <Link className="navLink" to="/deleteaccount">
                                Delete Account
                            </Link>
                        </nav>
                        <div className="navPicContainer">
                            <Profilepic
                                onClick={this.clickHandler}
                                className="profilePic"
                                profilepictureurl={
                                    profilepictureurl || "/images/default.svg"
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
                            clickHandler={this.clickHandler}
                        />
                    )}
                </div>
            </header>
        );
    }
}
