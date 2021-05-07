const express = require("express");
const router = express.Router();
const db = require("../utils/db");
const bc = require("../utils/bc");
const expressSanitizer = require("express-sanitizer");

router.use(expressSanitizer());

router.route("/register").post((req, res) => {
    console.log("register here");
    let { first, last, email, password } = req.body;
    console.log("req.body", req.body);
    if (first && last && email && password) {
        bc.hashPassword(password)
            .then(hashedPassword => {
                console.log("hashedPassword", hashedPassword);
                db.registration(first, last, email, hashedPassword)
                    .then(results => {
                        console.log("req.session.userId", req.session.userId);

                        req.session.userId = results.rows[0].id;
                        res.json({
                            success: true
                        });
                        console.log("results", results);
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

module.exports = router;
