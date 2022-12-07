/**
 * Point routes:
 * needs to provide Auth token for all end-points.
 * - Create: creates a new point
 * - update: update existing point
 * - delete: delete point
 * - get: get all points from a project update, supports pagination
 */

const express = require("express");
const {
  createPoint,
  updatePoint,
  deletePoint,
  getPoints,
} = require("../controllers/PointController");
const { checkPointExists } = require("../utils/checkPointExists");
const { checkUpdateExists } = require("../utils/checkUpdateExists");

const router = express.Router();

router.post("/create", checkUpdateExists, createPoint);
router.put("/update", checkPointExists, updatePoint);
router.delete("/delete", checkPointExists, deletePoint);
router.get("/get/:project_update_id", checkUpdateExists, getPoints);

module.exports = {
  routes: router,
};
