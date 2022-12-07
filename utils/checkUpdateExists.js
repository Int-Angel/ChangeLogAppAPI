/**
 * Verifies the existence of the update in the db
 */

"use strict";
const { ProjectUpdate } = require("../services/db");

const checkUpdateExists = async (req, res, next) => {
  try {
    const project_update_id =
      typeof req.body.project_update_id === "undefined"
        ? req.params["project_update_id"]
        : req.body.project_update_id;

    if (typeof project_update_id === "undefined") {
      return res.status(400).send({
        message: "no project_update_id!",
      });
    }

    const update = await ProjectUpdate.findOne({
      where: {
        project_update_id: project_update_id,
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
