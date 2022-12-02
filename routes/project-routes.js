const express = require("express");
const {
  createProject,
  updateProject,
  deleteProject,
  getProjects,
} = require("../controllers/ProjectController");

const router = express.Router();

router.post("/create", createProject);
router.put("/update", updateProject);
router.delete("/delete", deleteProject);
router.get("/get", getProjects);

module.exports = {
  routes: router,
};
