const express = require("express");
const router = express.Router();
const db = require("../utils/db");

module.exports = router;

router.route("/findusers").get((req, res) => {
    console.log("/////// FIND USERS GET REQUEST");
    //username of searched for user
    let name = req.query.name;
    // console.log("req.session", req.session);
    // console.log("req.query", req.query);
    // console.log("req.query.name", req.query.name);
    // console.log("//////FIND USERS = req.query.userIds", req.session.userId);
    if (!name || name == "") {
        db.recentUsers(req.session.userId)
            .then(recentUsersResults => {
                // console.log("///// findResults", recentUsersResults.rows);
                res.json({
                    user: recentUsersResults.rows
                    // first: recentUsersResults.rows[0].first,
                    // last: recentUsersResults.rows[0].last,
                    // id: recentUsersResults.rows[0].id,
                    // bioinfo: recentUsersResults.rows[0].bioinfo,
                    // profilepictureurl: recentUsersResults.rows[0].profilepictureurl
                });
            }) // end then
            .catch(err => {
                res.json({
                    error: "Sorry, please try again"
                });
            }); // end catch
    } else {
        db.findPeople(req.session.userId, name)
            .then(findResults => {
                res.json({
                    user: findResults.rows
                    // first: findResults.rows[0].first,
                    // last: findResults.rows[0].last,
                    // id: findResults.rows[0].id,
                    // bioinfo: findResults.rows[0].bioinfo,
                    // profilepictureurl:
                    //     findResults.rows[0].profilepictureurl
                });
            })
            .catch(err => {
                res.json({
                    success: false,
                    error:
                        "Sorry, your find recent users search went wrong, please try again"
                });
            });
    }
});
