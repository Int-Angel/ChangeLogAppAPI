/**
 * Verifies the existence of the user in the db
 */

"use strict";
const { AppUser } = require("../services/db");

const checkUserExists = async (req, res, next) => {
  try {
    const user = await AppUser.findOne({
      where: {
        app_user_id: req.body.creator_id,
      },
    });

    if (!user) {
      return res.status(400).send({
        message: "User doesn't exist!",
      });
    }

    next();
  } catch (error) {
    return res.status(500).send({
      message: "Can't check user exists!",
      error: error.message,
    });
  }
};

module.exports = {
  checkUserExists,
};
