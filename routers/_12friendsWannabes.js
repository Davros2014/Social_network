const express = require("express");
const router = express.Router();
const db = require("../utils/db");

module.exports = router;

router.route("/friendsWannabes").get((req, res) => {
    // console.log("/////// FRIENDS WANNABES");
    let loggedinUserId = req.session.userId;
    // console.log("loggedinUserId", loggedinUserId);
    db.friendsTable(loggedinUserId)
        .then(results => {
            console.log("///////results", results);
            res.json({
                users: results.rows
            });
        }) // end then
        .catch(err => {
            // console.log("error > friend wannabees request", err);
            res.json({
                error: "An error occurred..."
            });
        }); // end catch
});
