const express = require("express");
const path = require("path");
const app = express();


const rutasMain = require ("./src/routes/main.js");

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "/src/views"));

app.listen(3000, ()=>{
    console.log("Servidor funcionando");
});

app.use("/", rutasMain);

app.use((req, res, next)=>{
    res.status(404).render("404")
})