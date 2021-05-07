import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
    friendsWannabes,
    acceptFriendRequest,
    unfriend
} from "../actions/actions";
import { Link } from "react-router-dom";
import PageContainer from "./PageContainer";
import Loader from "./Loader";

class Friends extends Component {
    componentDidMount() {
        this.props.dispatch(friendsWannabes());
    }
    render() {
        const { friends, pending } = this.props;
        // console.log("this.props.friends", friends);
        return (
            <Fragment>
                {!friends ? (
                    <Loader />
                ) : (
                    <PageContainer>
                        <h2 className="h5_header friendsListHeader">
                            {" "}
                            Friends
                        </h2>
                        <div className="friendsEtcContainer">
                            {friends &&
                                friends.map(friends => (
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
                            {pending &&
                                pending.map(pending => (
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
                                                    acceptFriendRequest(
                                                        pending.id
                                                    )
                                                )
                                            }
                                        >
                                            Accept User Invite
                                        </button>
                                    </div>
                                ))}
                        </div>
                    </PageContainer>
                )}
            </Fragment>
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
