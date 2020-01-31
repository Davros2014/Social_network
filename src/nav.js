import React from "react";
import { Link } from "react-router-dom";

export function Nav() {
    return (
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
    );
}
