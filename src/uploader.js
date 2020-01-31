import React from "react";
import axios from "./axios";

export class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = { profile: null, uploaderVisible: false };
        this.clickHandler = this.clickHandler.bind(this);
    }
    handleInput({ target }) {
        this.setState({ [target.name]: target.files[0] });
        console.log(
            "///// button clicked > profile pic: ",
            target.files[0].name
        );
        target.files[0].name;
    }
    showEditMode() {
        this.state.viewable == true
            ? this.setState({ viewable: false })
            : this.setState({ viewable: true });
    }
    clickHandler() {
        console.log("click, click ");
        this.setState(
            this.state.uploaderVisible
                ? { uploaderVisible: false, introVisible: true }
                : { uploaderVisible: true, introVisible: false }
        );
    }

    // closeSubmit(e) {
    //     this.showEditMode(e);
    //     this.handleInput(e);
    // }

    submit() {
        console.log("this.state", this.state);
        let formData = new FormData();
        console.log("////// formData ///// ", formData);
        formData.append("file", this.state.file);
        console.log("////// formData after ///// ", formData);
        console.log("UPLOAD BUTTON CLICKED");
        axios
            .post("/upload", formData)
            .then(results => {
                console.log("///////// results", results.data.url);
                this.props.upDateImage(results.data.url);
            })
            .catch(function(err) {
                console.log("error ", err);
            });
    }
    render() {
        return (
            <div className="uploadOpacity">
                <div className="uploadContainer">
                    <button
                        onClick={this.clickHandler}
                        className="closeUploader"
                    >
                        X
                    </button>
                    <div className="uploadWrapper">
                        <h5 className="h5_header">
                            Would you like to change your profile image?
                        </h5>
                        {this.state.error && (
                            <div className="error">
                                Oops, something went wrong!
                            </div>
                        )}
                        <div className="uploadsContainer">
                            <div className="box">
                                <input
                                    type="file"
                                    name="file"
                                    id="file"
                                    className="inputfile inputfile-4"
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
                                    <span>Choose a file&hellip;</span>
                                </label>
                            </div>
                            <button
                                className="uploadProfileButton"
                                onClick={e => this.submit(e)}
                            >
                                SUBMIT
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
