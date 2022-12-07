/**
 * Verifies the existence of the point in the db
 */

"use strict";
const { Point } = require("../services/db");

const checkPointExists = async (req, res, next) => {
  try {
    const point = await Point.findOne({
      where: {
        point_id: req.body.point_id,
      },
    });

    if (!point) {
      return res.status(400).send({
        message: "Point doesn't exist!",
      });
    }

    next();
  } catch (error) {
    return res.status(500).send({
      message: "Unable to verify Point!",
      error: error.message,
    });
  }
};

module.exports = {
  checkPointExists,
};
