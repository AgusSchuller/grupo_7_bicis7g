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
      //console.log(products)
      let respuesta = {
        meta: {
          status: 200,
          total: products.length,
          url: "api/products",
        },
        data: {
          id: products[0].id,
          Nombre: products[0].name,
          Descripcion: products[0].description,
          Modelo:  products[0].model.name,
          Talla:  products[0].size.name,
          Url: 'localhost:3000/products'
        },
      };
      res.json(respuesta);
    });
  },

  detail: (req, res) => {
    Product.findByPk(req.params.id, {
      include: [{ association: "model" }, { association: "size" }],
    }).then((product) => {
      //console.log(product)
      //console.log(product?.data?.id )
      //console.log(req.params.id)
      if (
        product?.dataValues?.id !== null &&
        product?.dataValues?.id == req.params.id
      ) {
        let respuesta = {
          meta: {
            status: 200,
            total: product.length,
            url: "/api/products/:id",
          },
          data: {
            id: product.dataValues.id,
            Nombre: product.dataValues.name,
            Descripcion: product.dataValues.description,
            Modelo:  product.dataValues.model.name,
            Talla:  product.dataValues.size.name,
            Url: `localhost:3000/products/${product.dataValues.id}`
          },
        };
        return res.json(respuesta);
      }
      return res.status(200).json("No existe el producto");
    });
  },
};

module.exports = prodApiController;
