import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleChange({ target }) {
        this.setState({ [target.name]: target.value });
        console.log("[target.name]", [target.name]);
    }
    submit() {
        console.log(this.state);
        console.log("this.state.password", this.state.password);
        console.log("this.state.first", this.state.first);
        console.log("this.state.last", this.state.last);
        console.log("this.state.email", this.state.email);
        axios
            .post("/register", {
                first: this.state.first,
                last: this.state.last,
                email: this.state.email,
                password: this.state.password
            })
            .then(({ data }) => {
                if (data.success) {
                    location.replace("/");
                } else if (data.error) {
                    this.setState({
                        error: true
                        // error: error_message
                        // error: "Sorry, an error occured, please try again!"
                    });
                }
            });
        //can use from petition except return a json response - same for log in
    }

    render() {
        return (
            <React.Fragment>
                <div className="registrationForm">
                    {this.state.error && (
                        <div className="error">
                            Sorry, an error occured, please try again!
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
                        onClick={e => this.submit()}
                    >
                        {" "}
                        Submit
                    </button>
                    <h5 className="Link registerText">
                        Already a member? Log-in
                        <Link className="Link" to="/login">
                            {" "}
                            <span>here</span>
                        </Link>
                    </h5>
                </div>
            </React.Fragment>
        );
    }
}
