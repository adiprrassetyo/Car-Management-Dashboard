var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("cars/index", {
    title: "Binar | Car Management Dashboard",
    nama: "Adi Prasetyo",
  });
});

module.exports = router;
