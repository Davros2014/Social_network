import React, { Fragment } from "react";
import { HashRouter, Route, Link } from "react-router-dom";

// components
import Registration from "./registration";
import Login from "./login";
import Logo from "./logo";

export default function Welcome() {
    // if (!req.session == null) {
    //     return (
    //         <div className="loader">
    //             <img className="loader_logo" src="/images/zero_logo.svg" />
    //         </div>
    //     );
    // }
    return (
        <div className="registerLoginScreen">
            <div className="mainContent">
                <div className="mainContentWrapper">
                    <HashRouter>
                        <Fragment>
                            <Link to="/">
                                <Logo />
                            </Link>
                            <div className="logRegWrapper">
                                <h2 className="h4_header logoTitle">
                                    Welcome to the Zero<span>&#176;</span>
                                    community,
                                </h2>
                            </div>
                            <Route exact path="/" component={Registration} />
                            <Route path="/login" component={Login} />
                        </Fragment>
                    </HashRouter>
                </div>
            </div>
        </div>
    );
}
