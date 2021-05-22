var spicedPg = require("spiced-pg");

const dbUrl =
    process.env.DATABASE_URL ||
    "postgres:postgres:postgres@localhost:5432/salt_socialnetwork";

const db = spicedPg(dbUrl);

//// DB QUERIES >>> USERS.SQL TABLE //////////////////

//////////////////////////////////////////////////////
// POST /REGISTER > REGISTRATION /////////////////////

// select all user info from registration fields
module.exports.registration = function registration(
    first,
    last,
    email,
    password
) {
    console.log("in DB registration");
    return db.query(
        `
        INSERT INTO users (first, last, email, password)
        VALUES ($1, $2, $3, $4) RETURNING id
        `,
        [first, last, email, password]
    );
};

//////////////////////////////////////////////////////
// GET /USER > GET-USER-DATA /////////////////////////

module.exports.getUserData = function getUserData(id) {
    return db.query(
        `
        SELECT first, last, email, bioinfo, profilepictureurl, id FROM users WHERE id = $1;`,
        [id]
    );
};

//////////////////////////////////////////////////////
// POST /LOGIN > GET-USER-INFO ///////////////////////

// select all user info from registration fields
module.exports.getUserInfo = function getUserInfo(email) {
    console.log("getuserdata", email);
    return db.query(
        `
        SELECT id, first, last, email, password, bioinfo, profilepictureurl FROM users
        WHERE email = $1;`,
        [email]
    );
};

//////////////////////////////////////////////////////
// POST /UPLOAD > ADD-USER-PROFILE-PIC ///////////////
//////////////////////////////////////////////////////

module.exports.addUserProfilePic = function addUserProfilePic(
    id,
    profilepictureurl
) {
    return db.query(
        `UPDATE users SET profilepictureurl = $2 WHERE id = $1 RETURNING profilepictureurl`,
        [id, profilepictureurl]
    );
};

//////////////////////////////////////////////////////
// POST /BIO > UPDATE BIO ////////////////////////////
//////////////////////////////////////////////////////

module.exports.addUserbioinfo = function addUserbioinfo(id, bioinfo) {
    return db.query(
        `UPDATE users SET bioinfo = $2 WHERE id = $1
        RETURNING id, bioinfo, first, last, email
        `,
        [id, bioinfo]
    );
};

//////////////////////////////////////////////////////
// COUNT USERS ///////////////////////////////////////
//////////////////////////////////////////////////////

module.exports.getSumUsers = function getSumUsers(email) {
    return db.query(
        `SELECT COUNT(email) FROM users;
        `,
        [email]
    );
};

//////////////////////////////////////////////////////
// FIND PEOPLE ///////////////////////////////////////
//////////////////////////////////////////////////////

module.exports.findPeople = function findPeople(id, name) {
    return db.query(
        `SELECT id, first, last, profilepictureurl FROM users
        WHERE first ILIKE $2
        AND ID !=$1
        ORDER by last
        LIMIT 30`,
        [id, `${name}%`]
    );
};

//////////////////////////////////////////////////////
// RECENT USERS //////////////////////////////////////
//////////////////////////////////////////////////////

module.exports.recentUsers = function recentUsers(id) {
    return db.query(
        `SELECT id, first, last, profilepictureurl FROM users
        WHERE id!=$1
        ORDER BY id DESC
        LIMIT 15`,
        [id]
    );
};
//
//
//
//
//////////////////////////////////////////////////////
//// DB QUERIES >>> FRIENDS.SQL TABLE ////////////////

//////////////////////////////////////////////////////
// CHECK STATUS //////////////////////////////////////
//////////////////////////////////////////////////////

module.exports.checkStatus = function checkStatus(viewer_id, owner_id) {
    return db.query(
        `
        SELECT * FROM friends
        WHERE (sender_id = $1 AND receiver_id = $2)
        OR (sender_id = $2 AND receiver_id = $1)
        `,
        [owner_id, viewer_id]
    );
};

//////////////////////////////////////////////////////
// SEND FRIEND REQUEST ///////////////////////////////
//////////////////////////////////////////////////////

module.exports.friendRequest = function friendRequest(viewer_id, owner_id) {
    return db.query(
        `
        INSERT INTO friends (sender_id, receiver_id)
        VALUES ($1, $2);
        `,
        [owner_id, viewer_id]
    );
};

//////////////////////////////////////////////////////
// DELETE FRIENDS ////////////////////////////////////
//////////////////////////////////////////////////////

module.exports.deleteFriends = function deleteFriends(viewer_id, owner_id) {
    return db.query(
        `
        DELETE FROM friends receiver_id
        WHERE (sender_id = $1 AND receiver_id = $2)
        OR (sender_id = $2 AND receiver_id = $1)
        `,
        [owner_id, viewer_id]
    );
};

//////////////////////////////////////////////////////
// UPDATE/ADD FRIENDS ////////////////////////////////
//////////////////////////////////////////////////////

module.exports.updateFriends = function updateFriends(viewer_id, owner_id) {
    return db.query(
        `
        UPDATE friends
        SET accepted = TRUE
        WHERE (sender_id = $1 AND receiver_id = $2)
        OR (sender_id = $2 AND receiver_id = $1)
        `,
        [owner_id, viewer_id]
    );
};

//////////////////////////////////////////////////////
// NEW FRIENDS TABLE /////////////////////////////////
//////////////////////////////////////////////////////

module.exports.friendsTable = function friendsList(viewer_id) {
    return db.query(
        `
        SELECT users.id, first, last, profilepictureurl, accepted
        FROM friends
        JOIN users
        ON (accepted = false AND receiver_id = $1 AND sender_id = users.id)
        OR (accepted = true AND receiver_id = $1 AND sender_id = users.id)
        OR (accepted = true AND receiver_id = $1 AND sender_id = users.id)
        `,
        [viewer_id]
    );
};

//
//
//
//
//////////////////////////////////////////////////////
//// DB QUERIES >>> CHAT.SQL TABLE ///////////////////

//////////////////////////////////////////////////////
// GET RECENT MESSAGES ///////////////////////////////
//////////////////////////////////////////////////////

// module.exports.getRecentChatMessages = function getRecentChatMessages() {
//     return db.query(
//         `
//         SELECT messages FROM chat
//         ORDER BY created_at DESC
//         LIMIT 10`
//     );
// };

module.exports.getRecentChatMessages = function getRecentChatMessages() {
    return db.query(
        `
       SELECT user_id, first, last, profilepictureurl, messages, bioinfo, chat.created_at, chat.id
       FROM users
       INNER JOIN chat
       ON user_id = users.id
       ORDER BY chat.id DESC
       LIMIT 10`
    );
};

//////////////////////////////////////////////////////
// POST RECENT MESSAGE ///////////////////////////////
//////////////////////////////////////////////////////

module.exports.addChatMessage = function addChatMessage(messages, user_id) {
    return db.query(
        `
        INSERT INTO chat (messages, user_id)
        VALUES ($1, $2)
        RETURNING *
        `,
        [messages, user_id]
    );
};

//////////////////////////////////////////////////////
// DELETE ACCOUNT ////////////////////////////////////
//////////////////////////////////////////////////////

module.exports.accountDeletion = function accountDeletion(user_id) {
    return db.query(
        `
        DELETE FROM users WHERE id  = $1
        `,
        [user_id]
    );
};

//////////////////////////////////////////////////////
// FIND IMAGE TO DELETE //////////////////////////////
//////////////////////////////////////////////////////

module.exports.getS3Image = function getS3Image(user_id) {
    return db.query(
        `
        SELECT profilepictureurl from users
        WHERE id = $1
        `,
        [user_id]
    );
};
