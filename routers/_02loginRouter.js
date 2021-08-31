const express = require("express");
const router = express.Router();
const db = require("../utils/db");
const bc = require("../utils/bc");

module.exports = router;

router.route("/login").post((req, res) => {
    console.log(" == LOGIN == ");
    let { email, password } = req.body;
    if (email && password) {
        db.getUserInfo(email)
            .then(result => {
                if (result.rows.length == 1) {
                    const passwordInput = result.rows[0].password;
                    bc.checkPassword(password, passwordInput)
                        .then(pwCheck => {
                            if (pwCheck) {
                                req.session.userId = result.rows[0].id;
                                res.json({
                                    success: true
                                });
                            } else {
                                res.json({
                                    success: false,
                                    error:
                                        "Sorry, the password you entered appears to be incorrect & should be a minimum of 4 characters in length"
                                });
                            }
                        })
                        .catch(error => {
                            console.log("error", error.message);
                            res.json({
                                success: false,
                                error: "Sorry, please enter details again"
                            });
                        });
                } else {
                    res.json({
                        success: false,
                        error: "Sorry, this is not a valid email"
                    });
                }
            })
            .catch(error => {
                console.log("error", error.message);
                res.json({
                    success: false,
                    error: "Sorry, please enter details again"
                });
            });
    } else {
        res.json({
            success: false,
            error:
                "All inputs fields are mandatory, please try again, thank you"
        });
    }
});
