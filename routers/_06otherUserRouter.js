const express = require("express");
const router = express.Router();
const db = require("../utils/db");

module.exports = router;

router.route("/otheruser/:id").get((req, res) => {
    let currentUser = req.session.userId;
    let otherUser = req.params.id;
    if (otherUser == currentUser) {
        res.json({
            success: false,
            error: "Sorry, please try for another user"
        });
    } else {
        db.getUserData(req.params.id)
            .then(results => {
                let otherUserdata = results;
                let profilepicture =
                    otherUserdata.rows[0].profilepictureurl ||
                    "./images/other_default.png";
                res.json({
                    success: true,
                    first: results.rows[0].first,
                    last: results.rows[0].last,
                    id: results.rows[0].id,
                    bioinfo: results.rows[0].bioinfo,
                    profilepicture: profilepicture
                });
            })
            .catch(error => {
                res.json({
                    success: false,
                    error: "Sorry, please try again"
                });
                console.log("error", error);
            });
    }
});
