import React from "react";
import { Link } from "react-router-dom";

// components
import Logo from "./Logo";
import Profilepicture from "./Profilepicture";
import Uploader from "./Uploader";

const NavBar = ({
    uploaderVisible,
    profilepictureurl,
    first,
    viewable,
    setProfilepictureurl,
    handleUploader,
    setUploaderVisible
}) => {
    return (
        <header className="topNav">
            <div className="topNav__wrapper">
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
                    </nav>
                    <div className="navPicContainer">
                        <Profilepicture
                            handleUploader={handleUploader}
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
                        upDateImage={img => {
                            setProfilepictureurl(img);
                            setUploaderVisible(false);
                        }}
                        viewable={viewable}
                        handleUploader={handleUploader}
                        profilepictureurl={profilepictureurl}
                    />
                )}
            </div>
        </header>
    );
};
export default NavBar;
