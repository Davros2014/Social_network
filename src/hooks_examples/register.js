import React from "react";
import { useState } from "react";
import axios from "axios";
import { useStatefulInputs, useAuthSubmission } from "./hooks";

export function Register() {
    const [values, onChange] = useStatefulInputs();
    const [error, submit] = useAuthSubmission("/register", values);
    console.log(values);
    return (
        <div>
            <h1>Register</h1>
            {error && <div className="error">Something went wrong</div>}
            <input name="first" onChange={onChange} />
            <input name="last" onChange={onChange} />
            <input name="email" onChange={onChange} />
            <input name="password" onChange={onChange} />
            <button onClick={submit}>Submit</button>
        </div>
    );
}
