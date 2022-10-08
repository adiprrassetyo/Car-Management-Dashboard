var express = require("express");
var router = express.Router();
const CarControl = require("../controller/carController");
const uploadCar = require("../middleware/upload")

/* GET home page. */

router.get("/", CarControl.getAllCars);
router.post("/create", uploadCar,CarControl.addCars,);
router.post("/update/:id", uploadCar,CarControl.updateCars);
router.get("/delete/:id", CarControl.deleteCars);

module.exports = router;
