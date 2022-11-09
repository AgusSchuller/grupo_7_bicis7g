const express = require("express");
const path = require("path");
const app = express();


const rutasMain = require ("./src/routes/main.js");

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "/src/views"));

app.set("view engine", "ejs");

app.use("/", rutasMain);

app.listen(3000, ()=>{
    console.log("Servidor funcionando");
});