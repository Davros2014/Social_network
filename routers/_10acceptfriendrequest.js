const express = require("express");
const router = express.Router();
const db = require("../utils/db");

module.exports = router;

router.route("/acceptfriendship").post((req, res) => {
    console.log("/////// ACCEPT FRIENDS POST REQUEST");
    // console.log("req.body.otheruserid", req.body.otheruserid);
    // console.log("req.session.userId", req.session.userId);

    let loggedinUserId = req.session.userId;
    let ownerId = req.body.otheruserid;
    // console.log("req.body", req.body);

    db.updateFriends(ownerId, loggedinUserId)
        .then(results => {
            console.log("results", results);
            // console.log(
            //     "//////////// Accept request sent & add unfriend request"
            // );
            res.json({
                buttonName: "Unfriend User"
            });
        }) // end then
        .catch(err => {
            // console.log("error > insert friend request", err);
            res.json({
                error: "An error occurred..."
            });
        }); // end catch
});
