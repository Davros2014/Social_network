const express = require("express");
const router = express.Router();
const db = require("../utils/db");

module.exports = router;

router.route("/user").get((req, res) => {
    db.getUserData(req.session.userId)
        .then(results => {
            console.log("results in user route ", results);
            res.json({
                success: true,
                profilepictureurl:
                    results.rows[0].profilepictureurl || "/images/default.svg",
                first: results.rows[0].first,
                last: results.rows[0].last,
                id: results.rows[0].id,
                bioinfo: results.rows[0].bioinfo,
                email: results.rows[0].email
            });
        })
        .catch(err => {
            res.json({
                success: false,
                error: err
            });
        });
});
