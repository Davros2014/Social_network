const express = require("express");
const router = express.Router();
const db = require("../utils/db");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const s3 = require("./../utils/s3");
const bodyParser = require("body-parser");

module.exports = router;

router.use(bodyParser.json());

const diskStorage = multer.diskStorage({
    // figures out where on your HD the file should be saved - in this case "/uploads"
    destination: function(req, file, callback) {
        callback(null, __dirname + "./../uploads");
    },
    // filename method changes filename to make it unique
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

var uploader = multer({
    // responsible for what we upload and where
    storage: diskStorage,
    limits: {
        // filesize limit - in this case 2MB
        fileSize: 2097152
    }
});

router
    .route("/upload")
    .post(uploader.single("file"), s3.upload, function(req, res) {
        if (req.file) {
            let userProfileUrl =
                "https://s3.amazonaws.com/socialnetworkapp19/" +
                req.file.filename;
            // console.log("userProfileUrl", userProfileUrl);
            // console.log("POST REQUEST - req.file:", req.file);
            // console.log("req.session", req.session);
            db.addUserProfilePic(req.session.userId, userProfileUrl)
                .then(results => {
                    // console.log("Results are..", results);
                    res.json({
                        success: true,
                        url: userProfileUrl
                    });
                })
                .catch(err => {
                    res.json({
                        success: false,
                        message:
                            " Sorry, you did not upload an image or the image is too big"
                    });
                    console.log("ERROR: ", err.message);
                });
        } else {
            console.log(err);
            res.json({
                success: false
            });
        }
    });
