// ************ Require's ************
const express = require("express");
const path = require("path");
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE

// ************ express() ************
const app = express();

/****************** PUBLIC PATH *************************/
app.use(express.static(path.join(__dirname, 'public')));
const publicPath = path.resolve(__dirname, './public');
app.use( express.static(publicPath) );

// ************ Middlewares ************
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ************ Template Engine ************
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./src/views"));

// ************ Route System require and use() ************
const rutasMain = require ("./src/routes/main");
app.use("/", rutasMain);
const rutasProd = require ("./src/routes/products")
app.use(rutasProd)
const rutasUsers= require ("./src/routes/users")
app.use(rutasUsers)

// ************ error handler ************
app.use((req, res, next)=>{
    res.status(404).render("404")
})

/************* INICIANDO EL SERVIDOR **************/
app.listen(3000, ()=>{
    console.log("Servidor funcionando");
});