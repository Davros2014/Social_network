// FROM HOT OR NOT EG

import React from "react";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { friendsWannabes, acceptFriendRequest, unfriend } from "./actions";
import { Link } from "react-router-dom";

class Friends extends React.Component {
    componentDidMount() {
        this.props.dispatch(friendsWannabes());
    }
    render() {
        // const { users } = this.props.friends;
        console.log("this.props.friends", this.props.friends);
        // console.log("/////////users", users);

        if (!this.props.friends) {
            return (
                <div className="loader">
                    <img className="loader_logo" src="/images/zero_logo.svg" />
                </div>
            );
        }
        return (
            <React.Fragment>
                <div className="pageContainer">
                    <h2 className="h5_header friendsListHeader"> Friends</h2>
                    <div className="friendsEtcContainer">
                        {this.props.friends &&
                            this.props.friends.map(friends => (
                                <div
                                    className="friendsEtcWrapper"
                                    key={friends.id}
                                >
                                    <Link to={`/user/${friends.id}`}>
                                        <img
                                            className="userProfilePic"
                                            src={friends.profilepictureurl}
                                            alt=""
                                            onError={e => {
                                                e.target.src =
                                                    "/images/default.svg";
                                            }}
                                        />
                                    </Link>
                                    <p className="h5_header friendsEtcText">
                                        {friends.first} {friends.last}
                                    </p>
                                    <button
                                        className="buttonBasic friendButton"
                                        onClick={e =>
                                            this.props.dispatch(
                                                unfriend(friends.id)
                                            )
                                        }
                                    >
                                        Unfriend User
                                    </button>
                                </div>
                            ))}
                    </div>
                    <h2 className="h5_header pendingListHeader">
                        {" "}
                        Friends pending
                    </h2>

                    <div className="friendsEtcContainer">
                        {this.props.pending &&
                            this.props.pending.map(pending => (
                                <div
                                    className="friendsEtcWrapper"
                                    key={pending.id}
                                >
                                    <Link to={`/user/${pending.id}`}>
                                        <img
                                            className="userProfilePic"
                                            src={pending.profilepictureurl}
                                            alt=""
                                            onError={e => {
                                                e.target.src =
                                                    "/images/default.svg";
                                            }}
                                        />
                                    </Link>
                                    <p className="h4_header friendsEtcText">
                                        {pending.first} {pending.last}
                                    </p>
                                    <button
                                        className="friendButton buttonBasic"
                                        onClick={e =>
                                            this.props.dispatch(
                                                acceptFriendRequest(pending.id)
                                            )
                                        }
                                    >
                                        Accept User Invite
                                    </button>
                                </div>
                            ))}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = function(state) {
    console.log("state", state);
    return {
        friends:
            state.friendsWannabes &&
            state.friendsWannabes.filter(friend => {
                return friend.accepted == true;
            }),
        pending:
            state.friendsWannabes &&
            state.friendsWannabes.filter(friend => {
                return friend.accepted == false;
            })
    };
};

export default connect(mapStateToProps)(Friends);

/////////////////////
