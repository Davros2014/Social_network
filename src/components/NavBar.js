import React, { useState } from "react";
import { Link } from "react-router-dom";

// components
import Logo from "./Logo";
import Profilepicture from "./Profilepicture";
import Uploader from "./Uploader";
import Logout from "./Logout";

const NavBar = ({
    uploaderVisible,
    profilepictureurl,
    first,
    viewable,
    setProfilepictureurl,
    handleUploader,
    setUploaderVisible
}) => {
    const [logoutVisibility, setLogoutVisibility] = useState(false);

    const handleLogoutVisibility = () => {
        setLogoutVisibility(!logoutVisibility);
    };
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
                        <p
                            id="logout"
                            className="navLink"
                            onClick={handleLogoutVisibility}
                        >
                            Logout
                        </p>
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
                {logoutVisibility && (
                    <Logout
                        handleLogoutVisibility={handleLogoutVisibility}
                        logoutVisibility={logoutVisibility}
                    />
                )}
            </div>
        </header>
    );
};
export default NavBar;
