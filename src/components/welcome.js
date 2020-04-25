import React from "react";
import { HashRouter, Route } from "react-router-dom";
import { Registration } from "./registration";
import { Login } from "./login";
import { Logo } from "./logo";
import { Link } from "react-router-dom";

export function Welcome() {
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
                        <React.Fragment>
                            <Link to="/">
                                <Logo />
                            </Link>
                            <div className="logRegWrapper">
                                <h2 className="h4_header logoTitle">
                                    Welcome to the Zero<span>&#176;</span>{" "}
                                    community,
                                </h2>
                            </div>
                            <Route exact path="/" component={Registration} />
                            <Route path="/login" component={Login} />
                        </React.Fragment>
                    </HashRouter>
                </div>
            </div>
        </div>
    );
}
