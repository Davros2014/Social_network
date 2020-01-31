const express = require("express");
const router = express.Router();
const db = require("../utils/db");

module.exports = router;

router.route("/user").get((req, res) => {
    //res.json to send DATA back to the front as a response
    // console.log("GET /user");
    // console.log("file information is", req.body);
    db.getUserData(req.session.userId)
        .then(results => {
            // console.log("RESULTS IN GET REQUEST", results.rows[0]);
            // res.json(results.rows[0]);
            res.json({
                success: true,
                profilepictureurl:
                    results.rows[0].profilepictureurl || "/images/default.svg",
                first: results.rows[0].first,
                last: results.rows[0].last,
                id: results.rows[0].id,
                bioinfo: results.rows[0].bioinfo
            });
        })
        .catch(err => {
            res.json({
                success: false,
                error: err
            });
        });
});
