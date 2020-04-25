const express = require("express");
const router = express.Router();
const db = require("../utils/db");
const bc = require("../utils/bc");

module.exports = router;

router.route("/login").post((req, res) => {
    console.log(" ===========  LOGIN POST =========== ");
    // console.log("req.body", req.body);
    let { email, password } = req.body;
    // check if email and password are true (input)
    if (email && password) {
        db.getUserInfo(email)
            .then(result => {
                // console.log("RESULT ++++ ", result);
                // console.log("results are: ", result.rows[0].email);
                // checks if data contains an email address
                if (result.rows.length == 1) {
                    // console.log("results are", result.rows[0].password);
                    // console.log(
                    //     "passwordInput: result.rows[0].password",
                    //     result.rows[0].password
                    // );
                    // bc - bcrpyt checks password in database matches password user inputs (utils > bc.js)
                    const passwordInput = result.rows[0].password;
                    bc.checkPassword(password, passwordInput)
                        .then(pwCheck => {
                            if (pwCheck) {
                                // pwcheck function will return true if password matches
                                // console.log("Password status is....", pwCheck);
                                req.session.userId = result.rows[0].id;
                                res.json({
                                    success: true
                                });
                            } else {
                                // console.log("Password status is", pwCheck);
                                res.json({
                                    success: false,
                                    error:
                                        "Sorry, the password you entered is wrong"
                                });
                            }
                        })
                        .catch(err => {
                            console.log("Password is incorrect", err);
                            res.json({
                                success: false,
                                error: "Sorry, please enter details again"
                            });
                        });
                } else {
                    // console.log("not a valid email");
                    res.json({
                        success: false,
                        error: "Sorry, this is not a valid email"
                    });
                }
            })
            .catch(err => {
                console.log("Email is incorrect", err);
                res.json({
                    success: false,
                    error: "Sorry, please enter details again"
                });
            });
    } else {
        res.json({
            success: false,
            error: "All inputs fields are mandatory, please try again, thankyou"
        });
    }
});
