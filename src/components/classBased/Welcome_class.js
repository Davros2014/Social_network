import React, { Fragment } from "react";
import { HashRouter, Route, Link } from "react-router-dom";

// components
import Registration from "./Registration";
import Login from "./Login";
import Logo from "./Logo";
import Loader from "./Loader";
import PageContainer from "./PageContainer";
import PageWrapper from "./PageWrapper";

export default function Welcome(props) {
    console.log("props", props);
    // if (!req.session == null) {
    //     return (
    //			<Loader/>
    //     );
    // }
    return (
        <PageContainer>
            <HashRouter>
                <Fragment>
                    <div className="logoWrapper">
                        <Link to="/">
                            <Logo />
                        </Link>
                        <h2 className="h4_header logoTitle">
                            Welcome to the Zero<span>&#176;</span>
                            community
                        </h2>
                    </div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </Fragment>
            </HashRouter>
        </PageContainer>
    );
}
