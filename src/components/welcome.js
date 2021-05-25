import React, { Fragment } from "react";
import { HashRouter, Route, Link } from "react-router-dom";

import PageContainer from "./PageContainer";

// components
import Registration from "./Registration";
import Login from "./Login";
import Logo from "./Logo";
import Loader from "./Loader";

const Welcome = props => {
    if (!props) {
        return <Loader />;
    }
    return (
        <PageContainer>
            <div className="authWrapper">
                <HashRouter>
                    <Fragment>
                        <div className="logoWrapper">
                            <Link to="/">
                                <Logo />
                            </Link>
                            <h2 className="h4_header logoTitle">
                                Welcome to the Zero<span>&#176; </span>
                                community
                            </h2>
                        </div>
                        <Route exact path="/" component={Registration} />
                        <Route path="/login" component={Login} />
                    </Fragment>
                </HashRouter>
            </div>
        </PageContainer>
    );
};
export default Welcome;
