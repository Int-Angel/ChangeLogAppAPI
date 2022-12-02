const express = require("express");
const {
  createPoint,
  updatePoint,
  deletePoint,
  getPoints,
} = require("../controllers/PointController");
const { checkPointExists } = require("../utils/checkPointExists");

const router = express.Router();

router.post("/create", createPoint);
router.put("/update", checkPointExists, updatePoint);
router.delete("/delete", checkPointExists, deletePoint);
router.get("/get/:project_update_id", getPoints);

module.exports = {
  routes: router,
};
