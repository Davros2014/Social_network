import React, { useState } from "react";
import axios from "../axios";
import { Link } from "react-router-dom";

import useStateInputs from "../hooks/useStateInputs";

const Login = props => {
    const [email, setEmail] = useStateInputs("");
    const [password, setPassword] = useStateInputs("");
    const [error, setError] = useState("");

    const submit = () => {
        axios
            .post("/login", {
                email: email,
                password: password
            })
            .then(({ data }) => {
                if (data.success) {
                    location.replace("/");
                } else if (data.error) {
                    setError(data.error);
                }
            })
            .catch(err => console.log(err.message));
    };
    return (
        <div className="startPage">
            <div className="inputForm">
                {error && <div className="error">{error}</div>}
                <input
                    name="email"
                    placeholder="Email address"
                    autoComplete="off"
                    autoCorrect="off"
                    value={email}
                    spellCheck="false"
                    onChange={e => setEmail(e)}
                />
                <input
                    name="password"
                    placeholder="Password"
                    type="password"
                    autoComplete="off"
                    autoCorrect="off"
                    value={password}
                    spellCheck="false"
                    onChange={e => setPassword(e)}
                />
                <button
                    className="submitButton"
                    type="submit"
                    onClick={() => submit()}
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
};
export default Login;
