const { cars } = require("../models");

module.exports = class {
  static addCars(req, res, next) {
    const { name, rentPrice, type, image } = req.body;
    let errors = [];
    if (!name || !rentPrice || !type || !image) {
      errors.push({ msg: "Silahkan Lengkapi data" });
      console.log("Silahkan Lengkapi data");
    }
    if (errors.length > 0) {
      res.render("cars/createCar", { errors, url: req.url, title: "Add New Car" });
    } else {
      cars
        .create({
          name: req.body.name,
          rentPrice: req.body.rentPrice,
          type: req.body.type,
          image: req.body.image,
        })
        .then((result) => {
          errors.push({ msg: "Data berhasil ditambahkan" });
          res.render("cars/createCar", { errors, result, url: req.url, title: "Add New Car" });
          // res.send({data: result});
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
        res.render("cars/index", { ListCars: result, url: "/", title: "adi" });
        // res.send({ ListCars : result });
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  }
  static editCars(req, res, next) {
    const id = req.params.id;
    cars
      .findByPk(id)
      .then((result) => {
        console.log(result);
        res.render("cars/updateCar", { data: result, url: req.url, title: "Update Car" });
        // res.status(200).send(
        //   {data : result}
        // )
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  }
  static updateCars(req, res, next) {
    const id = req.params.id;
    let errors = [];
    cars
      .update(req.body, {
        where: { id: id },
      })
      .then((result) => {
        if (result == 1) {
          errors.push({ msg: "Data berhasil terupdate" });
          // console.log(newCars)
          console.log(req.body);
          res.render("cars/updateCar", {
            errors,
            data: req.body,
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
