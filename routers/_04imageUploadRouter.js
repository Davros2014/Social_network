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
let maxSize = 2097152;
var uploader = multer({
    // responsible for what we upload and where
    storage: diskStorage,
    limits: {
        // filesize limit - in this case 2MB
        fileSize: maxSize
    }
});

router
    .route("/upload")
    .post(uploader.single("file"), s3.upload, function(req, res) {
        if (req.file || req.file <= maxSize) {
            let userProfileUrl =
                "https://s3.amazonaws.com/socialnetworkapp19/" +
                req.file.filename;
            db.addUserProfilePic(req.session.userId, userProfileUrl)
                .then(() => {
                    res.json({
                        success: true,
                        url: userProfileUrl
                    });
                })
                .catch(err => {
                    res.json({
                        success: false,
                        error:
                            "Sorry, we could not upload your image, perhaps it is too large, please upload files less than 2mb in size"
                    });
                });
        } else {
            res.json({
                success: false,
                message:
                    "Sorry, we could not upload your image, perhaps it is too large, please only upload files less than 2mb in size"
            });
        }
    });

// => {
// 	if (data.success) {
// 		location.replace("/");
// 	} else if (data.error) {
// 		this.setState({
// 			error: true
// 		});
// 		console.log("error", data.error);
// 	}
// });
