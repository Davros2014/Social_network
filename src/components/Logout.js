import React from "react";
import { Link } from "react-router-dom";
import ModalBackground from "./ModalBackground";

const Logout = ({ logoutVisibility, handleLogoutVisibility }) => {
    return (
        <ModalBackground>
            <div
                className={`modalContainer logoutContainer ${
                    logoutVisibility ? "active" : "remove"
                } `}
            >
                <div className="innerModal logoutModal">
                    <p className="p_bodyTextMain">
                        Did you intend to log out? Just in case you didn&apos;t,
                        you can always stay with us...
                    </p>
                    <div className="btnContainerRow">
                        <a className="buttonBasic logout" href="/logout">
                            Yes
                        </a>
                        <a
                            className="buttonBasic logout"
                            onClick={handleLogoutVisibility}
                        >
                            No
                        </a>
                    </div>
                </div>
            </div>
        </ModalBackground>
    );
};
export default Logout;
