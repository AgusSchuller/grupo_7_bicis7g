const path = require('path');
const fs = require('fs');
const db = require('../database/models');
const Product = db.Product;
const Model = db.Model;
const Op = db.Sequelize.Op;

module.exports = {
    index: (req,res) =>{
        Product.findAll({
            include : [{association : 'model'}]
        })   
        .then(bicis =>{
            //return res.send(bicis);
            res.render(path.resolve(__dirname, '..', 'views', 'products', 'listado'),{bicis});
        })
        .catch(error => res.send(error))
    },
    show: (req,res) =>{
        let miBici;
        bicis.forEach(bici => {
            if(bici.id == req.params.id){
                miBici = bici;
            }
        });
        res.render(path.resolve(__dirname, '../views/products/productDetail'), {miBici, toThousand})
    },
    create: (req,res) =>{   
        res.render(path.resolve(__dirname, '../views/products/newProd'));
    },
    save: (req,res) =>{
        let ultimaBici = bicis.pop();
        bicis.push(ultimaBici);
        console.log();
        let nuevoProducto = {
            id: ultimaBici.id +1,
            nombre : req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            color: req.body.color,
            descuento: req.body.descuento,
            img:'/img/' + req.file.filename
        }
        bicis.push(nuevoProducto);
        let nuevoProductoGuardar = JSON.stringify(bicis,null,2);
        fs.writeFileSync(path.resolve(__dirname,'../database/products.json'), nuevoProductoGuardar);
        res.redirect('/products');
    },
    edit: (req,res)=>{
        const modoId = req.params.id;
        let biciEditar = bicis.find(bici=> bici.id == modoId);
        res.render(path.resolve(__dirname,'../views/products/editProd'), {biciEditar});
    },
    update: (req,res) =>{
        req.body.id = req.params.id;
        req.body.imagen = req.file ? req.file.filename : req.body.oldImagen;
        let bicisUpdate = bicis.map(bici =>{
            if(bici.id == req.body.id){
                return bici = req.body;
            }
            return bici;
        })
        let biciActualizar = JSON.stringify(bicisUpdate,null,2);
        fs.writeFileSync(path.resolve(__dirname,'../database/products.json'),biciActualizar)
        res.redirect('/products');
    },
    delete: (req,res) =>{
        const biciDeleteId = req.params.id;
        const bicisFinal = bicis.filter(bici => bici.id != biciDeleteId);
        let bicisGuardar = JSON.stringify(bicisFinal,null,2)
        fs.writeFileSync(path.resolve(__dirname, '../database/products.json'),bicisGuardar);
        res.redirect('/products');
    }
}