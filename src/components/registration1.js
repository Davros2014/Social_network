import React, { Fragment } from "react";
import axios from "../axios";
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleChange({ target }) {
        this.setState({ [target.name]: target.value });
    }
    submit() {
        const { first, last, password, email } = this.state;
        axios
            .post("/register", {
                first: first,
                last: last,
                email: email,
                password: password
            })
            .then(({ data }) => {
                if (data.success) {
                    location.replace("/");
                } else if (data.error) {
                    this.setState({
                        error: true
                    });
                }
            });
    }

    render() {
        const { error } = this.state;
        return (
            <Fragment>
                <div className="registrationForm">
                    {error && (
                        <div className="error">
                            Sorry, an error occured, {error}, please try again!
                        </div>
                    )}
                    <input
                        name="first"
                        placeholder="First name"
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={e => this.handleChange(e)}
                    />
                    <input
                        name="last"
                        placeholder="Last name"
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={e => this.handleChange(e)}
                    />
                    <input
                        name="email"
                        placeholder="Email address"
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={e => this.handleChange(e)}
                    />
                    <input
                        name="password"
                        placeholder="Password"
                        type="password"
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={e => this.handleChange(e)}
                    />
                    <button
                        className="submitButton"
                        type="submit"
                        onClick={this.submit}
                    >
                        Submit
                    </button>
                    <h5 className="Link registerText">
                        Already a member? Log-in
                        <Link className="Link" to="/login">
                            <span> here</span>
                        </Link>
                    </h5>
                </div>
            </Fragment>
        );
    }
}
