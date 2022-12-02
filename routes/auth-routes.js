const express = require("express");
const { signIn, signUp, signOut } = require("../controllers/AuthController");

const router = express.Router();

router.post("/signin", signIn);
router.post("/signup", signUp);
router.post("/signout", signOut);

module.exports = {
  routes: router,
};
