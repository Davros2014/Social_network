const express = require("express");
const router = express.Router();
const db = require("../utils/db");
// const expressSanitizer = require("express-sanitizer");

module.exports = router;

// router.use(expressSanitizer());

router.route("/bio").post((req, res) => {
    // console.log("POST REQUEST BIO - req.session:", req.session);
    console.log("req.session.bioinfo: ", req.body);
    db.addUserbioinfo(req.session.userId, req.body.bioinfo)
        .then(results => {
            // console.log("req.body: ", req.body);
            res.json({
                success: true,
                id: results.rows[0].id,
                bioinfo: req.body.bioinfo,
                first: results.rows[0].first,
                last: results.rows[0].last,
                email: results.rows[0].email
            });
            // console.log("results...", results);
        })
        .catch(err => {
            console.log("ERROR: ", err);
            res.json({
                success: false,
                message: "Sorry, an error occured, please try again"
            });
        });
});
