/**
 * Point controller
 */

"use strict";
const { Point } = require("../services/db");

/**
 * Creates a new point, needs to specify project_update_id
 */
const createPoint = async (req, res, next) => {
  try {
    Point.create({
      description: req.body.description,
      project_update_id: req.body.project_update_id,
    });
    res.send({ message: "Point created successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

/**
 * Updates existion point,needs to specify point_id
 */
const updatePoint = async (req, res, next) => {
  try {
    await Point.update(
      {
        description: req.body.description,
      },
      {
        where: {
          point_id: req.body.point_id,
        },
      }
    );
    res.send({ message: "Point updated successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

/**
 * Deletes point, needs to specify point_id
 */
const deletePoint = async (req, res, next) => {
  try {
    await Point.destroy({
      where: {
        point_id: req.body.point_id,
      },
    });
    res.send({ message: "Point deleted successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

/**
 * Returns all point from update, needs to specify project_update_id
 */
const getPoints = async (req, res, next) => {
  try {
    const { limit, offset } = req.query;
    const points = await Point.findAll({
      limit: limit ? parseInt(limit) : null,
      offset: limit && offset ? parseInt(offset) : null,
      where: {
        project_update_id: req.params["project_update_id"],
      },
    });
    console.log(
      "All updates from update: ",
      req.params["project_update_id"],
      JSON.stringify(points, null, 2)
    );
    res.send({ points: JSON.stringify(points) });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  createPoint,
  updatePoint,
  deletePoint,
  getPoints,
};
