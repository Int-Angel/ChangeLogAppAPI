"use strict";
const { Project } = require("../services/db");

const createProject = async (req, res, next) => {
  try {
    Project.create({
      name: req.body.name,
      description: req.body.description,
      creator_id: req.body.creator_id,
      publication_date: new Date(),
    });
    res.send({ message: "Project created successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const updateProject = async (req, res, next) => {
  /*
    verify that project exists before update
    */
  try {
    await Project.update(
      {
        name: req.body.name,
        description: req.body.description,
      },
      {
        where: {
          project_id: req.body.project_id,
        },
      }
    );
    res.send({ message: "Project updated successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteProject = async (req, res, next) => {
  /*
    verify that project exists before delete
    */
  try {
    await Project.destroy({
      where: {
        project_id: req.body.project_id,
      },
    });
    res.send({ message: "Project deleted successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getProjects = async (req, res, next) => {
  console.log("Get projects");
};

module.exports = {
  createProject,
  updateProject,
  deleteProject,
  getProjects,
};
