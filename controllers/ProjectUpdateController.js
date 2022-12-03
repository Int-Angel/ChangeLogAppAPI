"use strict";
const { ProjectUpdate, Point } = require("../services/db");

const createProjectUpdate = async (req, res, next) => {
  try {
    ProjectUpdate.create({
      description: req.body.description,
      project_id: req.body.project_id,
    });
    res.send({ message: "Project Update created successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const updateProjectUpdate = async (req, res, next) => {
  try {
    await ProjectUpdate.update(
      {
        description: req.body.description,
      },
      {
        where: {
          project_update_id: req.body.project_update_id,
        },
      }
    );
    res.send({ message: "Project Update updated successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteProjectUpdate = async (req, res, next) => {
  try {
    await ProjectUpdate.destroy({
      where: {
        project_update_id: req.body.project_update_id,
      },
    });
    res.send({ message: "Project Update deleted successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getProjectUpdate = async (req, res, next) => {
  try {
    const { limit, offset } = req.query;
    const updates = await ProjectUpdate.findAll({
      limit: limit ? parseInt(limit) : null,
      offset: limit && offset ? parseInt(offset) : null,
      where: {
        project_id: req.params["project_id"],
      },
      include: {
        model: Point,
        as: "points",
      },
    });
    console.log(
      "All updates from project: ",
      req.params["project_id"],
      JSON.stringify(updates, null, 2)
    );
    res.send({ updates: JSON.stringify(updates) });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  createProjectUpdate,
  updateProjectUpdate,
  deleteProjectUpdate,
  getProjectUpdate,
};
