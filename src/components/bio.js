import React, { Fragment, useState } from "react";
import axios from "../axios";
import { Link } from "react-router-dom";
import LeavingUs from "./LeavingUs";

const Bio = ({
    showEditMode,
    setBio,
    bioinfo,
    viewable,
    first,
    last,
    id,
    email,
    userInfo,
    showDeleteModal,
    setShowDeleteModal
}) => {
    const handleInput = ({ target }) => {
        setBio(target.value);
    };
    const closeSubmit = e => {
        showEditMode();
        handleSubmit(e);
    };
    const close = () => {
        showEditMode();
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
                    setBio(data.bioinfo);
                }
            })
            .catch(err => console.log(err));
    };
    return (
        <Fragment>
            {showDeleteModal && (
                <LeavingUs
                    showDeleteModal={showDeleteModal}
                    setShowDeleteModal={setShowDeleteModal}
                />
            )}
            <h3 className="h3_headers infoHeader">Personal Information</h3>
            <h5 className="bioSubHead">
                User:
                <br />
                <span>
                    {first} {last}
                </span>
            </h5>
            <div className="bioInfo">
                {bioinfo && !viewable && (
                    <>
                        <h5 className="bioSubHead">Short Bio: </h5>
                        <p className="p_bodyText bioInfoText">{bioinfo}</p>
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
                        <button onClick={closeSubmit} className="bioInfoBtn">
                            Save and close
                        </button>
                        <button onClick={close} className="bioInfoBtn">
                            Close
                        </button>
                    </div>
                )}
            </div>
            <div className="btnContainerRow deleteBtns">
                {bioinfo && (
                    <button
                        onClick={() => showEditMode()}
                        className="editAccount"
                    >
                        <i className="far fa-edit"></i>
                    </button>
                )}
                <button
                    onClick={() => setShowDeleteModal(true)}
                    className="deleteAccount"
                >
                    <i className="far fa-trash-alt"></i>
                </button>
            </div>
        </Fragment>
    );
};
export default Bio;
