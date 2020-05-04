import React, { Component } from "react";
import { Link } from "react-router-dom";

// components
import Logo from "./logo";
import Profilepic from "./profilepic";
import Uploader from "./uploader";

export default class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.props.handleUploader();
    }
    render() {
        // console.log("navbar props", this.props);
        const {
            uploaderVisible,
            profilepictureurl,
            first,
            viewable,
            showEditMode,
            handleUploader
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
                                handleClick={this.handleClick}
                                className="profilePic"
                                profilepictureurl={profilepictureurl}
                            />
                            <p className="welcome">
                                Welcome, <span>{first}</span>
                            </p>
                        </div>
                    </div>
                    {uploaderVisible && (
                        <Uploader
                            upDateImage={img =>
                                this.setState({
                                    profilepictureurl: img,
                                    uploaderVisible: false
                                })
                            }
                            viewable={viewable}
                            handleUploader={handleUploader}
                        />
                    )}
                </div>
            </header>
        );
    }
}
