const express = require("express");
const router = express.Router();
const send_email = require("./send_email");
const users_credentials = require("./users_credentials");
const google_login = require("./google_login");

router.get("/google-login", google_login.get_google_login);   // POST users_credentials"


router.get("/users-credentials", users_credentials.get_users_credentials);  // get users_credentials"


router.post("/send-email", send_email.post_send_email);    // POST send_email





module.exports = router;