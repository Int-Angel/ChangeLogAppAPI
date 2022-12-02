"use strict";
const { ProjectUpdate } = require("../services/db");

const checkUpdateExists = async (req, res, next) => {
  try {
    const update = await ProjectUpdate.findOne({
      where: {
        project_update_id: req.body.project_update_id,
      },
    });

    if (!update) {
      return res.status(400).send({
        message: "Update doesn't exist!",
      });
    }

    next();
  } catch (error) {
    return res.status(500).send({
      message: "Unable to verify update!",
      error: error.message,
    });
  }
};

module.exports = {
  checkUpdateExists,
};
