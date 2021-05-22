import React, { Fragment } from "react";
import axios from "../axios";
import { Link } from "react-router-dom";

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
            <h4 className="h3_header">Personal Information</h4>
            <h3 className="userName p_bodyText">
                User:
                <span>
                    {" "}
                    {first} {last}
                </span>
                <div className="mainLine" />
            </h3>

            <div className="bioInfo">
                {bioinfo && !viewable && (
                    <>
                        <h3 className="h3_header">BRIEF BIO</h3>
                        <p className="p_bodyText bioTextHolder">{bioinfo}</p>
                    </>
                )}

                {!bioinfo && !viewable && (
                    <button
                        onClick={() => showEditMode()}
                        className="bioInfoBtn"
                    >
                        Add your bio now
                    </button>
                )}
                {viewable && (
                    <div>
                        <textarea
                            spellCheck="false"
                            defaultValue={bioinfo}
                            className="bioTextArea"
                            name="bioinfo"
                            onChange={e => handleInput(e)}
                        />

                        <button
                            onClick={e => {
                                closeSubmit(e);
                            }}
                            className="bioInfoBtn"
                        >
                            Save and close
                        </button>
                        <button
                            onClick={() => showEditMode()}
                            className="bioInfoBtn"
                        >
                            Close
                        </button>
                    </div>
                )}
            </div>
            <div className="btnContainerRow deleteBtns">
                <button onClick={() => showEditMode()} className="editAccount">
                    <i class="far fa-edit"></i>
                </button>
                <Link className="deleteAccount" to="/deleteaccount">
                    <i
                        className="far fa-trash-alt"
                        onClick={() => showEditMode()}
                    ></i>
                </Link>
            </div>
        </Fragment>
    );
};
export default Bio;
