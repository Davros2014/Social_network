import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
    friendsWannabes,
    acceptFriendRequest,
    unfriend
} from "../actions/actions";
import { Link } from "react-router-dom";
import PageContainer from "./PageContainer";
import PageWrapper from "./PageWrapper";
import Loader from "./Loader";

class Friends extends Component {
    componentDidMount() {
        this.props.dispatch(friendsWannabes());
    }
    render() {
        const { friends, pending } = this.props;
        return (
            <Fragment>
                {!friends ? (
                    <Loader />
                ) : (
                    <PageContainer>
                        <PageWrapper>
                            <h2 className="h5_header friendsListHeader">
                                Friends
                            </h2>
                            {!friends.length && (
                                <p>
                                    Can&apos;t see any friends listed here? Try
                                    adding some from the Find friends section
                                </p>
                            )}
                            {friends.length > 0 && (
                                <p>
                                    You have {friends.length} friends listed
                                    here. Add more in Find friends section
                                </p>
                            )}
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
                                                    src={
                                                        friends.profilepictureurl
                                                    }
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
                            {!pending.length > 0 && (
                                <p>
                                    You don&apos;t have any pending friend
                                    requests as yet, try connecting with someone
                                    on the Find section
                                </p>
                            )}
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
                                                    src={
                                                        pending.profilepictureurl
                                                    }
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
                        </PageWrapper>
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
