import React, { Component } from "react";
import axios from "../axios";
import { Link } from "react-router-dom";

export default class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.submit = this.submit.bind(this);
        // this.handleChange = this.handleChange.bind(this);
    }
    handleChange({ target }) {
        this.setState({ [target.name]: target.value });
        // console.log("target.name", ([target.name], target.value));
    }
    submit() {
        const { first, last, email, password } = this.state;

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
                        error: data.error
                    });
                }
            });
    }
    render() {
        const { error } = this.state;
        return (
            <div className="authForm">
                {error && <div className="error">{error}</div>}
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
                <h5 className="authText">
                    Already a member? Log-in
                    <Link className="authLink" to="/login">
                        <span> here</span>
                    </Link>
                </h5>
            </div>
        );
    }
}
