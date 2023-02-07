const path = require("path");
const fs = require("fs");
const db = require('../database/models');
const Product = db.Product;

const mainController = {
  index: (req, res)=>{
     res.render("index", {bicis, toThousand})
  },
  //Carrito de compras
  productCart: (req, res)=>{
      res.render("./products/productCart")
  }
};

module.exports = mainController;