"use strict";
const { Project, ProjectUpdate, Point } = require("../services/db");

const createProject = async (req, res, next) => {
  try {
    Project.create({
      name: req.body.name,
      description: req.body.description,
      creator_id: req.body.creator_id,
      publication_date: new Date(),
      project_status: 1,
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
        project_status: req.body.project_status,
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
  try {
    const projects = await Project.findAll({
      include: {
        model: ProjectUpdate,
        as: "project_updates",
        include: {
          model: Point,
          as: "points",
        },
      },
    });
    console.log("All projects:", JSON.stringify(projects, null, 2));
    res.send({ projects: JSON.stringify(projects) });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  createProject,
  updateProject,
  deleteProject,
  getProjects,
};
