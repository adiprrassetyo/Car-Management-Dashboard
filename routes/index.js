var express = require("express");
var router = express.Router();
const CarControl = require("../controller/carController");
const { cars } = require("../models");
const uploadCar = require("../middleware/upload")

router.get("/", CarControl.getAllCars);

router.get("/cars/create",uploadCar, function (req, res, next) {
  res.render("cars/createCar", { url: req.url, title: "Add New Car" });
});
router.get("/cars/update/:id", uploadCar,CarControl.editCars);

router.use("/cars", require("./car"));

module.exports = router;
