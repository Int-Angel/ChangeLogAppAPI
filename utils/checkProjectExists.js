"use strict";
const { Project } = require("../services/db");

const checkProjectExists = async (req, res, next) => {
  try {
    const project = await Project.findOne({
      where: {
        project_id: req.body.project_id,
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
