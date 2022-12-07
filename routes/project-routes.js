/**
 * Project routes:
 * needs to provide Auth token for all end-points.
 * - Create: creates a new project
 * - update: update existing project
 * - delete: delete project
 * - get: get all projects, supports pagination and filters
 */

const express = require("express");
const {
  createProject,
  updateProject,
  deleteProject,
  getProjects,
} = require("../controllers/ProjectController");
const { checkProjectExists } = require("../utils/checkProjectExists");
const { checkUserExists } = require("../utils/checkUserExists");

const router = express.Router();

router.post("/create", checkUserExists, createProject);
router.put("/update", checkProjectExists, updateProject);
router.delete("/delete", checkProjectExists, deleteProject);
router.get("/get", getProjects);

module.exports = {
  routes: router,
};
