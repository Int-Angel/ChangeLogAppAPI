const express = require("express");
const { signIn, signUp, signOut } = require("../controllers/AuthController");
const {
  checkDuplicateUsernameOrEmail,
} = require("../utils/checkDuplicateUsernameOrEmail");

const router = express.Router();

router.post("/signin", signIn);
router.post("/signup", checkDuplicateUsernameOrEmail, signUp);
router.post("/signout", signOut);

module.exports = {
  routes: router,
};
