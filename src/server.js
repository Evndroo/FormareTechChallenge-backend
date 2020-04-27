const express = require("express"),
    bodyParser = require("body-parser"),
    session = require('express-session'),
    passport = require("passport"),
    http = require("http"),
    socketio = require("socket.io"),
    mongoose = require("mongoose"),
    routes = require("./routes");

const app = express();
const server = http.Server(app);
const socket = socketio(server);

mongoose.connect("mongodb+srv://"+process.env.MONGO_USER+":"+process.env.MONGO_PASSWORD+"@cluster0-g9asi.mongodb.net/test?retryWrites=true&w=majority",
{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

require("../config/oAuth")(passport);


app.use(session({
    secret: 'keyboard cat',
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 semana
        secure:false
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(routes);

server.listen(process.env.PORT || 3333);
