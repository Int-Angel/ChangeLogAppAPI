"use strict";
const { Project } = require("../services/db");

const checkProjectExists = async (req, res, next) => {
  try {
    const project_id =
      typeof req.body.project_id === "undefined"
        ? req.params["project_id"]
        : req.body.project_id;

    if (typeof project_id === "undefined") {
      return res.status(400).send({
        message: "no project_id!",
      });
    }

    const project = await Project.findOne({
      where: {
        project_id: project_id,
      },
    });

    if (!project) {
      return res.status(400).send({
        message: "Project doesn't exist!",
      });
    }

    next();
  } catch (error) {
    return res.status(500).send({
      message: "Unable to verify project!",
      error: error.message,
    });
  }
};

module.exports = {
  checkProjectExists,
};
