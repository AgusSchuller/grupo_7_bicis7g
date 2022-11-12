const path = require("path");

const mainController = {
    index: (req, res)=>{
       res.render("index")
    },
    login: (req, res)=>{
        res.render("./users/login")
    },
    register: (req, res)=>{
        res.render("./users/register")
    },
    productCart: (req, res)=>{
        res.render("./products/productCart")
    },
    productDetail: (req, res)=>{
        res.render("./products/productDetail")
    },
    newProd: (req, res)=>{
        res.render("./products/newProd")
    },
    editProd: (req, res)=>{
        res.render("./products/editProd")
    }
    };

module.exports = mainController;







