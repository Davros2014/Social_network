import React, { Component } from "react";
import axios from "../axios";

//components
import ModalBackground from "./ModalBackground";
import Profilepicture from "./Profilepicture";

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: null,
            uploaderVisible: true,
            tempImage: "",
            error: "",
            uploading: false
        };
        this.closeModal = this.closeModal.bind(this);
    }
    handleInput({ target }) {
        this.setState({ [target.name]: target.files[0] });
        this.setState({ tempImage: URL.createObjectURL(target.files[0]) });
    }
    showEditMode() {
        this.setState({ viewable: !this.props.viewable });
    }
    handleClick() {
        this.props.clickHandler();
    }
    closeModal() {
        this.props.handleUploader();
    }
    cancelImage() {
        this.setState({ tempImage: "" });
        this.setState({ error: "" });
    }
    loading() {
        this.setState({ uploading: !this.state.uploading });
    }
    submit() {
        let formData = new FormData();
        this.loading();
        formData.append("file", this.state.file);
        axios
            .post("/upload", formData)
            .then(results => {
                this.props.upDateImage(results.data.url);
                this.loading();
            })
            .catch(error => {
                console.log("error ", error);
                this.setState({ error: error.message });
            });
    }
    render() {
        const { error, tempImage, uploaderVisible, uploading } = this.state;
        return (
            <ModalBackground>
                {uploading ? (
                    <h4 className="h4_headers">Loading...</h4>
                ) : (
                    <div
                        className={`modalContainer ${
                            uploaderVisible ? "active" : "remove"
                        } `}
                    >
                        <button
                            onClick={this.closeModal}
                            className="modalCloseBtn"
                        >
                            X
                        </button>
                        <div className="modalWrapper">
                            <h4 className="h4_headers">
                                Would you like to change your profile image?
                            </h4>

                            <div className="uploadFileContainer">
                                {tempImage ? (
                                    <Profilepicture
                                        profilepictureurl={tempImage}
                                    />
                                ) : (
                                    <div className="inputFileWrapper">
                                        <input
                                            type="file"
                                            name="file"
                                            id="file"
                                            className="inputfile"
                                            onChange={e => this.handleInput(e)}
                                        />
                                        <label htmlFor="file">
                                            <figure>
                                                <img
                                                    className="uploadFile"
                                                    src="/images/file_upload.png"
                                                    alt="upload image"
                                                />
                                            </figure>
                                            Click icon to upload&hellip;
                                        </label>
                                    </div>
                                )}
                                {tempImage && (
                                    <div className="btnContainerRow">
                                        <button
                                            className="submitButton"
                                            onClick={() => this.cancelImage()}
                                        >
                                            Change
                                        </button>
                                        <button
                                            className={`buttonBasic ${
                                                !tempImage
                                                    ? "disabled"
                                                    : "submitButton"
                                            } `}
                                            onClick={e => this.submit(e)}
                                            disabled={!tempImage ? true : false}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                )}
                                {error && <div className="error">{error}</div>}
                            </div>
                        </div>
                    </div>
                )}
            </ModalBackground>
        );
    }
}
