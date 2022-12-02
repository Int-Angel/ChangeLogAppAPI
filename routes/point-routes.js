const express = require("express");
const {
  createPoint,
  updatePoint,
  deletePoint,
  getPoints,
} = require("../controllers/PointController");

const router = express.Router();

router.post("/create", createPoint);
router.put("/update", updatePoint);
router.delete("/delete", deletePoint);
router.get("/get/:project_update_id", getPoints);

module.exports = {
  routes: router,
};
