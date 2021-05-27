const express = require("express");
const router = express.Router();
const db = require("../utils/db");

module.exports = router;

router.route("/checkFriendStatus/:ownerid").get((req, res) => {
    // console.log("/////// CHECK FRIENDS GET REQUEST");
    // //
    // console.log("req.params.ownerid", req.params.ownerid);
    // console.log("req.session.userId", req.session.userId);

    let loggedinUserId = req.session.userId;
    let ownerId = req.params.ownerid;
    if (ownerId != loggedinUserId) {
        db.checkStatus(loggedinUserId, ownerId)
            .then(results => {
                // console.log("///// results.rows", results.rows);
                // console.log("results in check friends request", results);
                // no friend request
                if (results.rows.length == 0) {
                    res.json({
                        buttonName: "Send Friend Request"
                    });
                } else if (results.rows[0].receiver_id == ownerId) {
                    // friend request accepted
                    if (results.rows[0].accepted == true) {
                        res.json({
                            buttonName: "Unfriend User"
                        });
                        // is profile owner the recipient
                    } else {
                        res.json({
                            buttonName: "Cancel Friend Request"
                        });
                    }
                } else if (results.rows[0].sender_id == ownerId) {
                    if (results.rows[0].accepted == true) {
                        res.json({
                            buttonName: "Unfriend User"
                        });
                    } else {
                        res.json({
                            buttonName: "Accept Friend Request"
                        });
                    }
                }
            })
            .catch(err => {
                console.log("error in checkstatus", err);
                res.json({
                    error: "Sorry, please try again"
                });
            });
    }
});
