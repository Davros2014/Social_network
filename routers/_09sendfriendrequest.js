const express = require("express");
const router = express.Router();
const db = require("../utils/db");

module.exports = router;

router.route("/sendfriendrequest").post((req, res) => {
    // console.log("/////// SEND FRIENDS POST REQUEST");
    // console.log("req.body.otheruserid", req.body.otheruserid);
    // console.log("req.session.userId", req.session.userId);
    let loggedinUserId = req.session.userId;
    let ownerId = req.body.otheruserid;
    console.log("req.body", req.body);

    db.friendRequest(ownerId, loggedinUserId)
        .then(results => {
            // console.log(
            //     "//////////// Friend request sent > & cancel friend request > works, fuck yeah"
            // );
            res.json({
                buttonName: "Cancel Friend Request"
            });
        }) // end then
        .catch(err => {
            // console.log("error > insert friend request", err);
            res.json({
                error: err.message
            });
        });
});
