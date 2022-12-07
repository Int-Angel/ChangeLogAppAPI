/**
 * Updates routes:
 * needs to provide Auth token for all end-points.
 * - Create: creates a new update
 * - update: update existing update
 * - delete: delete update
 * - get: get all updates from a project, supports pagination
 */

const express = require("express");
const {
  createProjectUpdate,
  updateProjectUpdate,
  deleteProjectUpdate,
  getProjectUpdate,
} = require("../controllers/ProjectUpdateController");
const { checkUpdateExists } = require("../utils/checkUpdateExists");
const { checkProjectExists } = require("../utils/checkProjectExists");

const router = express.Router();

router.post("/create", checkProjectExists, createProjectUpdate);
router.put("/update", checkUpdateExists, updateProjectUpdate);
router.delete("/delete", checkUpdateExists, deleteProjectUpdate);
router.get("/get/:project_id", checkProjectExists, getProjectUpdate);

module.exports = {
  routes: router,
};
