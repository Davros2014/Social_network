import React from "react";
import { useState } from "react";
import axios from "axios";
import { useStatefulInputs, useAuthSubmission } from "./hooks";

export function Login() {
    const [values, onChange] = useStatefulInputs();
    const [error, submit] = useAuthSubmission("/login", values);
    console.log(values);
    return (
        <div>
            <h1>Log in</h1>
            {error && <div className="error">Something went wrong</div>}
            <input name="email" onChange={onChange} />
            <input name="password" onChange={onChange} />
            <button onClick={submit}>Submit</button>
        </div>
    );
}
