const express = require("express");
const router = express.Router();
const db = require("../utils/db");
const bc = require("../utils/bc");
const expressSanitizer = require("express-sanitizer");

router.use(expressSanitizer());

router.route("/register").post((req, res) => {
    let { first, last, email, password } = req.body;
    if (first && last && email && password) {
        bc.hashPassword(password)
            .then(hashedPassword => {
                db.registration(first, last, email, hashedPassword)
                    .then(results => {
                        req.session.userId = results.rows[0].id;
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
                res.json({
                    success: false,
                    error:
                        "Sorry, passowrd must be a minumum of 4 characters in length"
                });
            });
    } else {
        res.json({
            success: false,
            error: "All inputs fields are mandatory, please try again, thankyou"
        });
    }
});

module.exports = router;
