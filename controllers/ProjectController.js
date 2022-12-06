"use strict";
const {
  Sequelize,
  Project,
  ProjectUpdate,
  Point,
  AppUser,
} = require("../services/db");

const createProject = async (req, res, next) => {
  try {
    Project.create({
      name: req.body.name,
      description: req.body.description,
      creator_id: req.body.creator_id,
      publication_date: new Date(),
      project_status: 0,
    });
    res.send({ message: "Project created successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const updateProject = async (req, res, next) => {
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
    const { limit, offset } = req.query;
    const { creator, name } = req.query;
    const { date, todate } = req.query;
    /**
     Ideas:
     - filter by status
     - filter by description
     */

    const name_condition = name
      ? { name: { [Sequelize.Op.like]: `%${name}%` } }
      : null;

    const creator_condition = creator
      ? { username: { [Sequelize.Op.eq]: creator } }
      : null;

    let date_condition = date
      ? { publication_date: { [Sequelize.Op.eq]: date } }
      : null;

    if (date && todate) {
      date_condition = {
        publication_date: {
          [Sequelize.Op.between]: [date, todate],
        },
      };
    }

    const projects = await Project.findAll({
      limit: limit ? parseInt(limit) : null,
      offset: limit && offset ? parseInt(offset) : null,
      where: Sequelize.and(name_condition, date_condition),
      include: [
        {
          model: AppUser,
          as: "creator",
          attributes: ["app_user_id", "username", "email"],
          where: creator_condition,
        },
        {
          model: ProjectUpdate,
          as: "project_updates",
          include: {
            model: Point,
            as: "points",
          },
        },
      ],
    });

    console.log("Projects:", JSON.stringify(projects, null, 2));
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
