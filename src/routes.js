const express = require("express"),
    routes = express.Router();

const SessionController = require("./Controller/SessionController")


routes.post("/sessions/store",SessionController.store);
routes.get("/sessions/index",SessionController.index);
routes.post("/login", SessionController.login);
routes.post("/logout",SessionController.logout);
module.exports= routes