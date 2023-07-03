const express = require("express");
const Router = express.Router();
const { email_post, email_get,email_delete } = require("../controller/mailController");

Router.post("/", email_post);
Router.get("/", email_get);
Router.delete("/:id",email_delete);
module.exports = Router;
