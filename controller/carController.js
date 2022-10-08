const { cars } = require("../models");

module.exports = class {
  // add cars
  static addCars(req, res, next) {
    let errors = [];
    if (errors.length > 0) {
      res.render("cars/createCar", { errors, url: req.url, title: "Add New Car" });
    } else {
      cars
        .create({
          name: req.body.name,
          rentPrice: req.body.rentPrice,
          type: req.body.type,
          image:`/upload/${req.file.filename}`
        })
        .then((result) => {
          errors.push({ msg: "Data berhasil ditambahkan" });
          res.render("cars/createCar", { errors, result, url: req.url, title: "Add New Car" });
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    }
  }

  static getAllCars(req, res, next) {
    cars
      .findAll()
      .then((result) => {
        res.render("cars/index", { ListCars: result, url: "/", title: "" });
        // res.send({ ListCars : result });
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  }
  // Edit Cars
  static editCars(req, res, next) {
    const id = req.params.id;
    cars
      .findByPk(id)
      .then((result) => {
        res.render("cars/updateCar", { data: result, url: req.url, title: "Update Car" });
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  }
  static updateCars(req, res, next) {
    const id = req.params.id;
    let errors = [];
    console.log({file:req.body})
    cars
      .update({
        name: req.body.name,
        rentPrice: req.body.rentPrice,
        type: req.body.type,
        image:`/upload/${req.file.filename}`
      },
      {
        where: { id: id },
      })
      .then((result) => {
        if (result == 1) {
          errors.push({ msg: "Data berhasil terupdate" });
          res.render("cars/updateCar", {
            errors,
            data : req.body,
            title: "Update Car",
            url: req.url,
          });
        } else {
          res.redirect(`${id}`);
          errors.push({ msg: "Data gagal terupdate" });
        }
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  }
  // update cars
  static deleteCars(req, res, next) {
    const id = req.params.id;
    cars.destroy({
        where: { id: id },
      })
      .then((result) => {
        if (result == 1) {
          res.redirect("/");
        } else {
          res.send({
            message: `cannot delete id=${id}`,
          });
        }
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  }
};
