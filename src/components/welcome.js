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
            <div className="mainContentWrapper">
                <HashRouter>
                    <Fragment>
                        <Link to="/">
                            <Logo />
                        </Link>
                        <div className="logRegWrapper">
                            <h2 className="h4_header logoTitle">
                                Welcome to the Zero<span>&#176; </span>
                                community,
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
