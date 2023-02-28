const path = require("path");
const fs = require("fs");

const { check, validationResult, body } = require("express-validator");

const db = require("../database/models");
const Product = db.Product;
const Model = db.Model;
const Size = db.Size;
const Op = db.Sequelize.Op;

module.exports = {
  index: (req, res) => {
    Product.findAll({
      include: [{ association: "model" }],
    })
      .then((bicis) => {
        //return res.send(bicis);
        res.render(
          path.resolve(__dirname, "..", "views", "products", "administrar"),
          { bicis }
        );
      })
      .catch((error) => res.send(error));
  },
  show: (req, res) => {
    Product.findByPk(req.params.id, {
      include: [{ association: "model" }],
    })
      .then((miBici) => {
        res.render(
          path.resolve(__dirname, "..", "views", "products", "productDetail"),
          { miBici }
        );
      })
      .catch((error) => res.send(error));
  },
  create: (req, res) => {
    let modelos = Model.findAll();
    let tallas = Size.findAll();

    Promise.all([modelos, tallas]).then(([modelos, tallas]) => {
      res.render(
        path.resolve(__dirname, "..", "views", "products", "newProd"),
        { modelos, tallas }
      );
    });
    // res.render(path.resolve(__dirname, "../views/products/newProd"));
  },
  save: (req, res) => {
    let errors = validationResult(req);
    //req.body.image = req.file.filename;
    //return res.send(req.body);
    const _body = {
      //return res.send(_body);
      name: req.body.nombreProducto,
      description: req.body.descripcion,
      price: req.body.precio,
      discount: req.body.descuento,
      image: req.file ? req.file.filename : "",
      modelId: req.body.modelo,
      sizeId: req.body.talla,
    };
    // return res.send(_body);
    if (errors.isEmpty()) {
      Product.create(_body)
        .then((bici) => {
          res.redirect("/products");
        })
        .catch((error) => console.log(error));
    } else {
      let modelos = Model.findAll();
      let tallas = Size.findAll();
      Promise.all([modelos, tallas]).then(([modelos, tallas]) => {
        res.render(
          path.resolve(__dirname, "..", "views", "products", "newProd"),
          { modelos, tallas, errors: errors.mapped(), old: req.body }
        );
      });
    }
  },
  edit: (req, res) => {
    const modelos = Model.findAll();
    const tallas = Size.findAll();
    const productos = Product.findByPk(req.params.id, {
      include: [{ association: "model" }, { association: "size" }],
    });
    Promise.all([productos, modelos, tallas])
      .then(([biciEditar, modelos, tallas]) => {
        //return res.send(biciEditar);
        res.render(
          path.resolve(__dirname, "..", "views", "products", "editProd"),
          { biciEditar, modelos, tallas }
        );
      })
      .catch((error) => res.send(error));
  },
  update: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      Product.update(
        {
          name: req.body.nombre,
          description: req.body.descripcion,
          price: req.body.precio,
          discount: req.body.descuento,
          image: req.body.filename,
          modelId: req.body.modelo,
          sizeId: req.body.talla,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      )
        .then(() => res.redirect("/products"))
        .catch((error) => res.send(error));
    } else {
      const modelos = Model.findAll();
      const tallas = Size.findAll();
      const productos = Product.findByPk(req.params.id, {
        include: [{ association: "model" }, { association: "size" }],
      });
      Promise.all([productos, modelos, tallas])
        .then(([biciEditar, modelos, tallas]) => {
          //return res.send(biciEditar);
          res.render(
            path.resolve(__dirname, "..", "views", "products", "editProd"),
            {
              biciEditar,
              modelos,
              tallas,
              errors: errors.mapped(),
              old: req.body,
            }
          );
        })
        .catch((error) => res.send(error));
    }
  },
  delete: (req, res) => {
    Product.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() => res.redirect("/products"))
      .catch((error) => res.send(error));
  },
};
