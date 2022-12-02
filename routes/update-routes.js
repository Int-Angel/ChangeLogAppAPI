const express = require("express");
const {
  createProjectUpdate,
  updateProjectUpdate,
  deleteProjectUpdate,
  getProjectUpdate,
} = require("../controllers/ProjectUpdateController");
const { checkUpdateExists } = require("../utils/checkUpdateExists");

const router = express.Router();

router.post("/create", createProjectUpdate);
router.put("/update", checkUpdateExists, updateProjectUpdate);
router.delete("/delete", checkUpdateExists, deleteProjectUpdate);
router.get("/get/:project_id", getProjectUpdate);

module.exports = {
  routes: router,
};
