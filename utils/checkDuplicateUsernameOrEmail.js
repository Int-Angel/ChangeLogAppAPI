/**
 * Checks if the email or username are already register in the DB
 */

"use strict";
const { AppUser } = require("../services/db");

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    let user = await AppUser.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (user) {
      return res.status(400).send({
        message: "Username is already in use!",
      });
    }

    user = await AppUser.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (user) {
      return res.status(400).send({
        message: "Email is already in use!",
      });
    }

    next();
  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate Username!",
      error: error.message,
    });
  }
};

module.exports = {
  checkDuplicateUsernameOrEmail,
};
