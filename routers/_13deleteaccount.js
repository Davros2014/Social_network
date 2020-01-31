const express = require("express");
const router = express.Router();
const db = require("../utils/db");
const s3 = require("../utils/s3");

module.exports = router;

router.route("/deleteaccount").get((req, res) => {
    console.log("/////// req.session.userId", req.session.userId);
    let loggedinUserId = req.session.userId;
    console.log("loggedinUserId", loggedinUserId);
    const imgUrl = db.getS3Image(loggedinUserId);
    // delete images from s3 account
    s3.deleteImage(imgUrl.rows[0].profilepictureurl);
    db.accountDeletion(loggedinUserId)
        .then(() => {
            req.session = null;
            res.json({
                sucess: true
            });
        }) // end then
        .catch(err => {
            console.log("error", err);
            res.json({
                error: "An error occurred..."
            });
        }); // end catch
});
