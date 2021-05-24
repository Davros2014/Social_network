const express = require("express");
const router = express.Router();
const db = require("../utils/db");

module.exports = router;

router.route("/deleteaccount").post((req, res) => {
    let loggedinUserId = req.session.userId;
    db.accountDeletion(loggedinUserId)
        .then(() => {
            req.session = null;
            res.json({
                sucess: true
            });
        })
        .catch(err => {
            console.log("error", err);
            res.json({
                error: "An error occurred..."
            });
        });
});
