import React, { Fragment } from "react";
import { HashRouter, Route, Link } from "react-router-dom";

// components
import Registration from "./Registration";
import Login from "./Login";
import Logo from "./Logo";
import Loader from "./Loader";

export default function Welcome(props) {
    console.log("props", props);
    // if (!req.session == null) {
    //     return (
    //			<Loader/>
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
