const fs = require('fs');
const path = require("path");

const productsFilePath = path.join(__dirname, '../database/products.json');
const bicis = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//const visited = products.filter(function(product){return product.categoria == 'visited'})
//const inSale = products.filter(function(product){	return product.categoria == 'in-sale'})

const mainController = {
    index: (req, res)=>{
       res.render("index", {bicis, toThousand})
    },
    login: (req, res)=>{
        res.render("./users/login")
    },
    register: (req, res)=>{
        res.render("./users/register")
    },
    //Carrito de compras
    productCart: (req, res)=>{
        res.render("./products/productCart")
    }
};

module.exports = mainController;