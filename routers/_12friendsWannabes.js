const express = require("express");
const router = express.Router();
const db = require("../utils/db");

module.exports = router;

router.route("/friendsWannabes").get((req, res) => {
    // console.log("// FRIENDS WANNABES");
    let loggedinUserId = req.session.userId;
    db.friendsTable(loggedinUserId)
        .then(results => {
            res.json({
                users: results.rows
            });
        })
        .catch(err => {
            res.json({
                error: "An error occurred..."
            });
        });
});
