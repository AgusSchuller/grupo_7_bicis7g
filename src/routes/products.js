// ************ Require's ************
const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

// ************ express-validator ************
const { check, validationResult, body } = require("express-validator");

// ************ Controller Require ************
const prodController = require(path.resolve(
  __dirname,
  "../controllers/prodController"
));

//********** MULTER ********** */
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "..", "..", "public", "img", "bicis"));
  },
  filename: function (req, file, cb) {
    cb(null, "bici-" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

//********** VALIDACIONES ********** */
const validacionesCreate = [
  body("nombreProducto")
    .notEmpty()
    .withMessage("Debes completar el nombre")
    .isLength({
      min: 5,
    })
    .withMessage("El Nombre debe tener al menos cinco caracteres"),
  body("descripcion")
    .isLength({
      min: 20,
    })
    .withMessage("La descripcion debe tener al menos veinte caracteres"),
];

const validacionesEdit = [
  body("nombreProducto")
    .notEmpty()
    .withMessage("Debes completar el nombre")
    .isLength({
      min: 5,
    })
    .withMessage("El Nombre debe tener al menos cinco caracteres"),
  body("descripcion")
    .isLength({
      min: 20,
    })
    .withMessage("La descripcion debe tener al menos veinte caracteres"),
];

/*** GET ALL PRODUCTS ***/
router.get("/products", prodController.index);

/*** GET ONE PRODUCT ***/
router.get("/products/detail/:id", prodController.show);

/*** CREATE ONE PRODUCT ***/
router.get("/products/create", prodController.create);
router.post(
  "/products/create",
  upload.single("imagen"),
  validacionesCreate,
  prodController.save
);

/*** EDIT ONE PRODUCT ***/
router.get("/products/edit/:id", prodController.edit);
router.put(
  "/products/edit/:id",
  upload.single("imagen"),
  validacionesEdit,
  prodController.update
);

/*** DELETE ONE PRODUCT***/
router.get("/products/delete/:id", prodController.delete);

module.exports = router;
