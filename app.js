// ************ Require's ************
const express = require("express");
const path = require("path");
const session = require("express-session");
const cookies = require("cookie-parser");
const methodOverride = require("method-override"); // Pasar poder usar los métodos PUT y DELETE
const cookieAuthMiddleware = require("./src/middlewares/cookieAuthMiddleware");
const cors = require("cors");

// ************ express() ************
const app = express();

/****************** PUBLIC PATH *************************/
app.use(express.static(path.join(__dirname, "public")));
const publicPath = path.resolve(__dirname, "./public");
app.use(express.static(publicPath));

// ************ Middlewares ************
app.use(methodOverride("_method")); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: "Secreto" }));
app.use(cookies());
app.use(cookieAuthMiddleware);

// ************ Configurando CORS ************
var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
let allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "OPTIONS, POST, GET, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  );
  next();
};
app.use(allowCrossDomain);
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
app.use(express.urlencoded({ extended: false }));

// ************ Template Engine ************
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./src/views"));

// ************ Route System require and use() ************
const rutasMain = require("./src/routes/main");
app.use("/", rutasMain);

const rutasProd = require("./src/routes/products");
app.use(rutasProd);

const rutasUsers = require("./src/routes/users");
app.use(rutasUsers);

const usersApi = require("./src/routes/apis/usersApi");
app.use("/api/users", usersApi);

const productsApi = require("./src/routes/apis/productsApi");
app.use("/api/products", productsApi);

const cookieParser = require("cookie-parser");

// ************ error handler ************
app.use((req, res, next) => {
  res.status(404).render("404");
});

/************* INICIANDO EL SERVIDOR **************/
app.listen(3001, () => {
  console.log("Servidor funcionando en localhost:3001");
});
