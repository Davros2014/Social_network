import React, { Fragment } from "react";
import axios from "../axios";

const Bio = ({
    showEditMode,
    setBio,
    bioinfo,
    viewable,
    first,
    last,
    id,
    email
}) => {
    const handleInput = ({ target }) => {
        console.log("text in handleinput", target.value);
        setBio(target.value);
    };

    const closeSubmit = e => {
        showEditMode();
        handleSubmit(e);
    };
    // saves bio on submit
    const handleSubmit = ({ target }) => {
        // console.log("this.state - post bio", this.state);
        // const { id, bioinfo, first, last, email } = props;
        axios
            .post("/bio", {
                id: id,
                bioinfo: bioinfo,
                first: first,
                last: last,
                email: email
            })
            .then(({ data }) => {
                if (data.success) {
                    // console.log("Handlesubmit log", data);
                    // console.log("data.bioinfo", data.bioinfo);
                    // setState function passes bioinfo to setBio in app.js
                    setBio(data.bioinfo);
                    // console.log("this.props", this.props);
                }
            })
            .catch(err => console.log("error - post bio", err));
    };
    // const { first, last, bioinfo } = this.props;

    return (
        <Fragment>
            <h4 className="Personal_header">Personal Information</h4>
            <h3 className="userName p_bodyText">
                User:
                <span>
                    {first} {last}
                </span>
                <div className="mainLine" />
            </h3>

            <div className="bioInfo">
                {bioinfo && !viewable && (
                    <div>
                        <h3 className="Personal_header">BRIEF BIO</h3>
                        <p className="p_bodyText bioTextHolder">{bioinfo}</p>
                        <button
                            onClick={() => showEditMode()}
                            className="buttonBasic bioinfoAdd"
                        >
                            Edit your bio now
                        </button>
                    </div>
                )}

                {!bioinfo && (
                    <button
                        onClick={() => showEditMode()}
                        className="bioinfoAdd buttonBasic"
                    >
                        Add your bio now
                    </button>
                )}
                {viewable && (
                    <div>
                        <textarea
                            spellCheck="false"
                            defaultValue={bioinfo}
                            className=" bioTextArea"
                            name="bioinfo"
                            onChange={e => handleInput(e)}
                        />

                        <button
                            onClick={e => {
                                closeSubmit(e);
                            }}
                            className="buttonBasic bioinfoSave"
                        >
                            Save and close
                        </button>
                        <button
                            onClick={() => showEditMode()}
                            className="buttonBasic bioinfoSave"
                        >
                            CLOSE
                        </button>
                    </div>
                )}
            </div>
        </Fragment>
    );
};
export default Bio;
