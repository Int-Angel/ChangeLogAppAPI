/**
 * Authentication routes:
 *  - Sign in
 *  - Sign up
 *  - Sign out: needs to provide auth token
 */

const express = require("express");
const { signIn, signUp, signOut } = require("../controllers/AuthController");
const {
  checkDuplicateUsernameOrEmail,
} = require("../utils/checkDuplicateUsernameOrEmail");
const { verifyToken } = require("../utils/authJwt");

const router = express.Router();

router.post("/signin", signIn);
router.post("/signup", checkDuplicateUsernameOrEmail, signUp);
router.post("/signout", verifyToken, signOut);

module.exports = {
  routes: router,
};
