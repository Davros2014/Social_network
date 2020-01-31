import React from "react";
import { useState } from "react";
import axios from "axios";

export function useStatefulInputs() {
    const [values, setValues] = useState({});
    const onChange = e =>
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    return [values, onChange];
}

export function useAuthSubmission(url, values) {
    const [error, setError] = useState(false);
    const submit = e =>
        axios
            .post(url, values)
            .then(({ data }) =>
                data.success ? location.replace("/") : setError(true)
            );
    return [error, submit];
}
