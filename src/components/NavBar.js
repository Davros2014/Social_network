import React, { useState, useEffect, Fragment } from "react";
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
    const [isDesktop, setIsDesktop] = useState(false);

    // let desktopSize = window.innerWidth > 980;
    const updateDesktop = () => {
        setIsDesktop(window.innerWidth > 980);
    };

    const showMobileNav = () => {
        document.querySelector(".mobileNav").classList.toggle("active");
    };

    useEffect(() => {
        updateDesktop();
        window.addEventListener("resize", updateDesktop);
        return () => window.removeEventListener("resize", updateDesktop);
    }, [updateDesktop]);

    const handleLogoutVisibility = () => {
        setLogoutVisibility(!logoutVisibility);
    };
    return (
        <Fragment>
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
            <header className="topNav">
                <div className="topNav__wrapper">
                    <Link to="/">
                        <Logo />
                    </Link>
                    <div className="nav mainNav">
                        <nav
                            className={`${
                                isDesktop ? "deskTopNav" : "mobileNav"
                            } `}
                        >
                            <div
                                className={isDesktop ? null : "mobile-btn"}
                                onClick={showMobileNav}
                            >
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <>
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
                            </>
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
                </div>
            </header>
        </Fragment>
    );
};
export default NavBar;
