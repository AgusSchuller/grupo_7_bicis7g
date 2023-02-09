const path = require("path");
const fs = require("fs");
const db = require("../database/models");
const Product = db.Product;
const Model = db.Model;
const Op = db.Sequelize.Op;

module.exports = {
  index: (req, res) => {
   Product.findAll({
      include: [{ association: "model" }], 
    })
    .then((bicis) => {
        //return res.send(bicis);
       res.render(
        path.resolve(__dirname, "..", "views", "products", "listado"),
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
    Model.findAll().then((modelos) => {
      res.render(
        path.resolve(__dirname, "..", "views", "products", "newProd"),
        { modelos }
      );
    });
    //res.render(path.resolve(__dirname, "../views/products/newProd"));
  },
  save: (req, res) => {
    //req.body.image = req.file.filename;
    //return res.send(req.body);
    const _body = {
      //return res.send(_body);
      name: req.body.nombre,
      description: req.body.descripcion,
      price: req.body.precio,
      discount: req.body.descuento,
      image: req.file.filename,
      modelId: req.body.modelo,
      sizeId: req.body.talla,
    };
    //return res.send(_body);
    Product.create(_body)
      .then((bici) => {
        res.redirect("/products");
      })
      .catch((error) => res.send(error));
  },
  edit: (req, res) => {
    const modelos = Model.findAll()
    const productos= Product.findByPk(req.params.id,{
        include : [{association : 'model'}]
    })
    Promise.all([productos, modelos])  
    .then( ([biciEditar, modelos]) =>{
        //return res.send(categorias);
        res.render(path.resolve(__dirname, '..','views','products','editProd'), {biciEditar, modelos})
    })  
    .catch(error => res.send(error))        
  },
  update: (req, res) => {
    req.body.id = req.params.id;
    req.body.imagen = req.file ? req.file.filename : req.body.oldImagen;
    let bicisUpdate = bicis.map((bici) => {
      if (bici.id == req.body.id) {
        return (bici = req.body);
      }
      return bici;
    });
    let biciActualizar = JSON.stringify(bicisUpdate, null, 2);
    fs.writeFileSync(
      path.resolve(__dirname, "../database/products.json"),
      biciActualizar
    );
    res.redirect("/products");
  },
  delete: (req, res) => {
    Product.destroy({
      where: {
          id : req.params.id
      }
  })
  .then(()=>  res.redirect('/products'))
  .catch(error => res.send(error))
  },
};
