import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleChange({ target }) {
        this.setState({ [target.name]: target.value });
    }

    submit() {
        console.log(this.state);
        console.log("this.state.password", this.state.password);
        console.log("this.state.email", this.state.email);
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
                        error: true
                        // error: "Sorry, an error occured, please try again!"
                    });
                }
            });
    }
    render() {
        return (
            <div className="startPage">
                <div className="inputForm">
                    {this.state.error && (
                        <div className="error">
                            Oops! Something is missing, please try again
                        </div>
                    )}
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
                        onClick={e => this.submit()}
                    >
                        Submit
                    </button>
                    <h5 className="registerText">
                        Registered yet? Register
                        <Link className="Link" to="/">
                            <span>here</span>
                        </Link>
                    </h5>
                </div>
            </div>
        );
    }
}
