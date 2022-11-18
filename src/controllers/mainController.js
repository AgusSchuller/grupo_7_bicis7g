const fs = require('fs');
const path = require("path");

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//const visited = products.filter(function(product){return product.categoria == 'visited'})
//const inSale = products.filter(function(product){	return product.categoria == 'in-sale'})

const mainController = {
    index: (req, res)=>{
       res.render("index")
    },
    login: (req, res)=>{
        res.render("./users/login")
    },
    register: (req, res)=>{
        res.render("./users/register")
    }
}
/*  
    productDetail: (req, res)=>{
        res.render("./products/productDetail")
    },
    newProd: (req, res)=>{
        res.render("./products/newProd")
    },
    editProd: (req, res)=>{
        res.render("./products/editProd")
    }
    };*/

module.exports = mainController;