const express = require("express");
const {
  createProject,
  updateProject,
  deleteProject,
  getProjects,
} = require("../controllers/ProjectController");
const { checkProjectExists } = require("../utils/checkProjectExists");

const router = express.Router();

router.post("/create", createProject);
router.put("/update", checkProjectExists, updateProject);
router.delete("/delete", checkProjectExists, deleteProject);
router.get("/get", getProjects);

module.exports = {
  routes: router,
};
