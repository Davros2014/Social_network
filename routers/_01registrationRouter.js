const express = require("express");
const router = express.Router();
const db = require("../utils/db");
const bc = require("../utils/bc");
const expressSanitizer = require("express-sanitizer");

module.exports = router;

router.use(expressSanitizer());

router.route("/register").post((req, res) => {
    // console.log("POST /register - do you read me, over");
    // console.log("req.session", req.session);
    // console.log("req.body.first", req.body.first);
    // console.log("req.body.last", req.body.last);
    // console.log("req.body.email", req.body.email);
    // console.log("req.body.password", req.body.password);
    let { first, last, email, password } = req.body;
    if (first && last && email && password) {
        bc.hashPassword(req.body.password)
            .then(hashedPassword => {
                // console.log("#### HASHED PASSWORD", hashedPassword);
                db.registration(
                    req.body.first,
                    req.body.last,
                    req.body.email,
                    hashedPassword
                )
                    .then(results => {
                        // req.session adds to cookies
                        req.session.userId = results.rows[0].id;
                        // console.log("req.session", req.session);
                        res.json({
                            success: true
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.json({
                            success: false,
                            error: "Sorry, please enter details again"
                        });
                    });
            })
            .catch(err => {
                console.log(err);
            });
    } else {
        res.json({
            success: false,
            error: "All inputs fields are mandatory, please try again, thankyou"
        });
    }
});
