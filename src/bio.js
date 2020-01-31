import React from "react";
import axios from "./axios";

export class Bio extends React.Component {
    constructor(props) {
        super(props);
        this.state = { viewable: false };
        console.log("Bio.props", this.props);
        console.log("Bio - this.state.bio", this.props.bioinfo);
        this.showEditMode = this.showEditMode.bind(this);
        // This binding is necessary to make `this` work in the callback
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInput({ target }) {
        this.setState({
            bioinfo: target.value
        });
    }
    showEditMode() {
        this.state.viewable == true
            ? this.setState({ viewable: false })
            : this.setState({ viewable: true });
    }
    closeSubmit(e) {
        this.showEditMode(e);
        this.handleSubmit(e);
    }
    // saves bio on submit
    handleSubmit({ target }) {
        console.log("this.state - post bio", this.state);
        axios
            .post("/bio", {
                id: this.state.id,
                bioinfo: this.state.bioinfo,
                first: this.state.first,
                last: this.state.last,
                email: this.state.email
            })
            .then(({ data }) => {
                if (data.success) {
                    console.log("Handlesubmit log", data);
                    console.log("data.bioinfo", data.bioinfo);
                    // setState function passes bioinfo to setBio in app.js
                    this.props.setBio(data.bioinfo);
                    console.log("this.props", this.props);
                }
            })
            .catch(err => console.log("error - post bio", err));
    }
    render() {
        return (
            <React.Fragment>
                <h4 className="Personal_header">Personal Information</h4>
                <h3 className="userName p_bodyText">
                    <bold>User:</bold>
                    <span>
                        {this.props.first} {this.props.last}
                    </span>
                    <div className="mainLine" />
                </h3>

                <div className="bioInfo">
                    {this.props.bioinfo && !this.state.viewable && (
                        <div>
                            <h3 className="Personal_header">BRIEF BIO</h3>
                            <p className="p_bodyText bioTextHolder">
                                {this.props.bioinfo}
                            </p>
                            <button
                                onClick={e => {
                                    this.showEditMode(e);
                                }}
                                className="buttonBasic bioinfoAdd"
                            >
                                Edit your bio now
                            </button>
                        </div>
                    )}

                    {!this.props.bioinfo && (
                        <button
                            onClick={e => {
                                this.showEditMode(e);
                            }}
                            className="bioinfoAdd buttonBasic"
                        >
                            Add your bio now
                        </button>
                    )}
                    {this.state.viewable && (
                        <div>
                            <textarea
                                spellCheck="false"
                                defaultValue={this.props.bioinfo}
                                className=" bioTextArea"
                                name="bioinfo"
                                onChange={e => this.handleInput(e)}
                            />

                            <button
                                onClick={e => {
                                    this.closeSubmit(e);
                                }}
                                className="buttonBasic bioinfoSave"
                            >
                                {" "}
                                Save and close{" "}
                            </button>
                        </div>
                    )}
                </div>
            </React.Fragment>
        );
    }
}
