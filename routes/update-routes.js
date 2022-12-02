const express = require("express");
const {
  createProjectUpdate,
  updateProjectUpdate,
  deleteProjectUpdate,
  getProjectUpdate,
} = require("../controllers/ProjectUpdateController");

const router = express.Router();

router.post("/create", createProjectUpdate);
router.put("/update", updateProjectUpdate);
router.delete("/delete", deleteProjectUpdate);
router.get("/get", getProjectUpdate);

module.exports = {
  routes: router,
};
