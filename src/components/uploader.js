import React from "react";
import axios from "../axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = { profile: null, uploaderVisible: true };
        this.closeModal = this.closeModal.bind(this);
        // this.clickHandler = this.clickHandler.bind(this);
        // this.handleClick = this.handleClick.bind(this);
        // this.showEditMode = this.showEditMode.bind(this);
    }
    handleInput({ target }) {
        this.setState({ [target.name]: target.files[0] });
        console.log(
            "///// handleInput button clicked > profile pic: ",
            target.files[0].name
        );
        target.files[0].name;
    }
    showEditMode() {
        this.setState({ viewable: !this.props.viewable });
    }

    // clickHandler() {
    //     console.log("click, click ");
    //     this.setState(
    //         this.state.uploaderVisible
    //             ? { uploaderVisible: false, introVisible: true }
    //             : { uploaderVisible: true, introVisible: false }
    //     );
    // }
    handleClick() {
        this.props.clickHandler();
    }

    // closeSubmit(e) {
    //     this.showEditMode(e);
    //     this.handleInput(e);
    // }
    closeModal() {
        this.props.handleUploader();
    }
    submit() {
        console.log("UPLOAD BUTTON CLICKED");

        let formData = new FormData();

        // console.log("////// formData ///// ", formData);
        formData.append("file", this.state.file);
        // console.log("////// formData after ///// ", formData);
        axios
            .post("/upload", formData)
            .then(results => {
                // console.log("///////// results", results.data.url);
                this.props.upDateImage(results.data.url);
            })
            .catch(function(err) {
                console.log("error ", err);
            });
    }
    render() {
        const { error } = this.state;
        return (
            <div className="uploadOpacity">
                <div className="uploadContainer">
                    <button onClick={this.closeModal} className="closeUploader">
                        X
                    </button>
                    <div className="uploadWrapper">
                        <h5 className="h5_header">
                            Would you like to change your profile image?
                        </h5>
                        {error && (
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
