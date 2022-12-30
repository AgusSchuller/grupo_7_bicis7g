const path = require("path");
const fs = require("fs");

const productsFilePath = path.join(__dirname, "../database/products.json");
const bicis = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

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