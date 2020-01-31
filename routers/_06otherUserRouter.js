const express = require("express");
const router = express.Router();
const db = require("../utils/db");

module.exports = router;

router.route("/otheruser/:id").get((req, res) => {
    // console.log("/// GET OTHER USER");

    //current logged-in user id
    let currentUser = req.session.userId;
    // other user id
    let otherUser = req.params.id;
    // req.params.id checks out ok
    // console.log("///////req.params.id", req.params.id);
    // console.log("RESULTS IN GET REQUEST - ");
    if (otherUser == currentUser) {
        res.json({
            success: false,
            error: "Sorry, please try for another user"
        });
    } else {
        db.getUserData(req.params.id)
            .then(results => {
                let otherUserdata = results;
                // console.log("///// otherUserdata", otherUserdata);
                let profilepicture =
                    otherUserdata.rows[0].profilepictureurl ||
                    "./images/other_default.png";
                // console.log(
                //     "///// otherUserdata.rows[0].profilepictureurl",
                //     otherUserdata.rows[0].profilepictureurl
                // );
                res.json({
                    success: true,
                    first: results.rows[0].first,
                    last: results.rows[0].last,
                    id: results.rows[0].id,
                    bioinfo: results.rows[0].bioinfo,
                    profilepicture: profilepicture
                });
            }) // end then
            .catch(error => {
                res.json({
                    success: false,
                    error: "Sorry, please try again"
                });
                console.log("error", error);
            });
    }
});
