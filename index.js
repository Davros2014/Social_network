// EXPRESS //////////////////////////////////////////
const express = require("express");
const app = express();
// BCRYPT & DB QUERIES ///////////////////////////////
const db = require("./utils/db");
// const bc = require("./utils/bc");
const PORT = 8080 || process.env.PORT;

// COMPRESSION - compresses json and css files etc

// socket.io

const server = require("http").Server(app);
// const io = require("socket.io")(server, { origins: "localhost:8080" funkychicken.heroku.com:*});
const io = require("socket.io")(server, { origins: "localhost:8080" });

// const compression = require("compression");
// var multer = require("multer");
// var uidSafe = require("uid-safe");
// var path = require("path");
const csurf = require("csurf");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");

app.use(express.static("./public"));

// IMPORT ROUTERS //////////////////////////////
const _01registerRouter = require("./routers/_01registrationRouter");
const _02loginRouter = require("./routers/_02loginRouter");
const _03userRouter = require("./routers/_03userRouter");
const _04uploadImageRouter = require("./routers/_04imageUploadRouter");
const _05updateBioRouter = require("./routers/_05updateBioRouter");
const _06otherUserRouter = require("./routers/_06otherUserRouter");
const _07findPeopleRouter = require("./routers/_07findPeopleRouter");
const _08checkFriendStatus = require("./routers/_08checkFriendStatus");
const _09sendfriendrequest = require("./routers/_09sendfriendrequest");
const _10acceptfriendrequest = require("./routers/_10acceptfriendrequest");
const _11deletefriendrequest = require("./routers/_11deletefriendrequest");
const _12friendsWannabes = require("./routers/_12friendsWannabes");
// const _13deleteaccount = require("./routers/_13deleteaccount");

// FIRST BODYPARSER ////////////////////////////////////////
app.use(bodyParser.json());
// THEN COOKIE SESSION AFTER BODY-P ////////////////////////
const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 14
});

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});
// CSURF TOKEN /////////////////////////////////////////////
app.use(csurf());
app.use((req, res, next) => {
    res.cookie("mytoken", req.csrfToken());
    res.setHeader("x-frame-options", "DENY");
    next();
});
///////////
if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

//////////////////////////////////////////////////////
// GET/POST ROUTES ///////////////////////////////////
//////////////////////////////////////////////////////

app.use(_01registerRouter);
app.use(_02loginRouter);
app.use(_03userRouter);
app.use(_04uploadImageRouter);
app.use(_05updateBioRouter);
app.use(_06otherUserRouter);
app.use(_07findPeopleRouter);
app.use(_08checkFriendStatus);
app.use(_09sendfriendrequest);
app.use(_10acceptfriendrequest);
app.use(_11deletefriendrequest);
app.use(_12friendsWannabes);
// app.use(_13deleteaccount);

//////////////////////////////////////////////////////
// GET /WELCOME //////////////////////////////////////
//////////////////////////////////////////////////////
// directs to welcome page if not logged in
app.get("/welcome", function(req, res) {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

// LOG OUT
app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome");
});

//////////////////////////////////////////////////
// FOR ALL OTHER ROUTES                         //
//////////////////////////////////////////////////

app.get("*", function(req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

// change from app to server for socket.io
server.listen(PORT, function() {
    console.log("Hello, is it me you're looking for...");
});

io.on("connection", socket => {
    var socketId = socket.id;
    console.log("socketId", socketId);
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }
    console.log(`Socket with id ${socket.id} just connected`);

    // socket.on("disconnect", () => {
    //     console.log(`Socket with id ${socket.id} just disconnected`);
    // });
    // const userId = socket.request.session.userId;

    db.getRecentChatMessages()
        .then(results => {
            if (!results.rows.length == 0) {
                console.log("+++++ results.rows", results.rows);
                socket.emit("allChatMessages", results.rows.reverse());
            }
        })
        .catch(err => {
            console.log(err);
        });

    socket.on("chatMessage", req => {
        db.addChatMessage(req, socket.request.session.userId)
            .then(() => {
                db.getRecentChatMessages()
                    .then(results => {
                        if (!results.rows.length == 0) {
                            console.log(
                                "after add message+++++ results.rows",
                                results.rows
                            );
                            io.sockets.emit(
                                "allChatMessages",
                                results.rows.reverse()
                            );
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
                // console.log("Results are...", results);
                // io.sockets.emit({
                //     data: results.rows
                // });
            })
            .catch(err => {
                console.log("ERROR: ", err);
            });
    });
});

// = this.elemRef.current.scrollHeight - this.elemRef.current.clientHeight
// io.sockets.sockets[mySocketId].emit();
