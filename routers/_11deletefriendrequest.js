const express = require("express");
const router = express.Router();
const db = require("../utils/db");

module.exports = router;

router.route("/deletefriends").post((req, res) => {
    // console.log("/////// CANCEL FRIENDS POST REQUEST");
    // console.log("req.body.otheruserid", req.body.otheruserid);
    // console.log("req.session.userId", req.session.userId);
    // console.log("//////buttonName", req.body.buttonName);

    let loggedinUserId = req.session.userId;
    let ownerId = req.body.otheruserid;
    // console.log("req.body", req.body);

    db.deleteFriends(ownerId, loggedinUserId)
        .then(results => {
            console.log(
                "//////////// Delete/unfriend friends * make friends button"
            );
            res.json({
                buttonName: "Send Friend Request"
            });
        }) // end then
        .catch(err => {
            // console.log("error > insert friend request", err);
            res.json({
                error: "An error occurred..."
            });
        }); // end catch
});
