const path = require("path");
const db = require("../../database/models");
const sequelize = db.sequelize;

const Size = db.Size;
const Model = db.Model;
const Product = db.Product;

const prodApiController = {
  list: (req, res) => {
    Product.findAll({
      include: [{ association: "model" }, { association: "size" }],
    }).then((products) => {
      let respuesta = {
        meta: {
          status: 200,
          total: products.length,
          url: "api/products",
        },
        data: products,
      };
      res.json(respuesta);
    });
  },

  detail: (req, res) => {
    Product.findByPk(req.params.id, {
      include: [{ association: "model" }, { association: "size" }],
    }).then((product) => {
      if (req.params.id == product.data.id) {
        let respuesta = {
          meta: {
            status: 200,
            total: product.length,
            url: "/api/products/:id",
          },
          data: product,
        };
        res.json(respuesta);
      }
      return res.json("No existe el producto");
    });
  },
};

module.exports = prodApiController;
