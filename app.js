// ************ Require's ************
const express = require("express");
const path = require("path");
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE

// ************ express() - (don't touch) ************
const app = express();

// ************ Middlewares - (don't touch) ************
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE

// ************ Template Engine - (don't touch) ************
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/src/views"));

// ************ Route System require and use() ************
const rutasMain = require ("./src/routes/main.js");
app.use("/", rutasMain);


// ************ error handler ************
app.use((req, res, next)=>{
    res.status(404).render("404")
})

app.listen(3000, ()=>{
    console.log("Servidor funcionando");
});
