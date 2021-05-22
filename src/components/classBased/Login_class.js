import React, { Component } from "react";
import axios from "../axios";
import { Link } from "react-router-dom";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleChange({ target }) {
        this.setState({ [target.name]: target.value });
    }
    submit() {
        axios
            .post("/login", {
                email: this.state.email,
                password: this.state.password
            })
            .then(({ data }) => {
                if (data.success) {
                    location.replace("/");
                } else if (data.error) {
                    this.setState({
                        error: data.error
                    });
                }
            })
            .catch(err => console.log(err.message));
    }
    render() {
        const { error } = this.state;
        return (
            <div className="startPage">
                <div className="inputForm">
                    {error && <div className="error">{error}</div>}
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
                        onClick={() => this.submit()}
                    >
                        Submit
                    </button>
                    <h5 className="registerText">
                        Registered yet? Register
                        <Link className="Link" to="/">
                            <span> here</span>
                        </Link>
                    </h5>
                </div>
            </div>
        );
    }
}
