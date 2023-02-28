const path = require("path");
const fs = require("fs");
const db = require("../database/models");
const Product = db.Product;

const mainController = {
  index: (req, res) => {
    Product.findAll()
      .then((bicis) =>
        res.render(path.resolve(__dirname, "..", "views", "index"), { bicis })
      )
      .catch((err) => res.send(err));
  },
  servicios:(req, res) => {
    res.render("./products/servicios");
  },
  //Carrito de compras
  productCart: (req, res) => {
    res.render("./products/productCart");
  },
   //Listado de productos
  listado:(req, res) => {
    Product.findAll()
    .then((bicis) =>
      res.render(path.resolve(__dirname, "..", "views", "products", "listado"), { bicis })
    )
    .catch((err) => res.send(err));
},
 };

module.exports = mainController;
