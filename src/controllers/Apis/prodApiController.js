const path = require("path");
const db = require("../../database/models");
const sequelize = db.sequelize;

const Size = db.Size;
const Model = db.Model;
const Product = db.Product;

const prodApiController = {
  list: async (req, res) => {
    try {
      let productsApi = await Product.findAll({
        include: ["model", "size"],
        attributes: ["id", "name", "description"],
      });
      let products = productsApi.map((product) => {
        //por cada elemento del array productsApi se le agrega la propiedad urlDetail
        return {
          ...product.dataValues,
          urlDetail: `http://localhost:3000/api/products/${product.id}`,
        };
      });
      res.json({
        meta: {
          status: 200,
          count: products.length,
        },
        data: {
          products,
        },
      });
    } catch (err) {
      console.log(err);
    }
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
            Modelo: product.dataValues.model,
            Talla: product.dataValues.size,
            Url: `localhost:3000/products/${product.dataValues.id}`,
          },
        };
        return res.json(respuesta);
      }
      return res.status(200).json("No existe el producto");
    });
  },
};

module.exports = prodApiController;
