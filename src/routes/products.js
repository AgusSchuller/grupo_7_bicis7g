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
  storage,
  fileFilter: (req, file, cb) => {
    fileLocal = file;
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
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
  body("imagen").custom(async (value, { req }) => {
    let file = fileLocal;
    let acceptedExtensions = [".jpg", ".jpeg", ".png", ".gif"];
    if (!file) {
      throw new Error("Tienes que subir una imagen");
    } else {
      let fileExtension = path.extname(file.originalname);
      if (!acceptedExtensions.includes(fileExtension)) {
        throw new Error(
          "Las extensiones de archivo permitidas son ${acceptedExtensions.join(",
          ")}"
        );
      }
    }
    return true;
  }),
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
  body("imagen").custom(async (value, { req }) => {
    let file = fileLocal;
    let acceptedExtensions = [".jpg", ".jpeg", ".png", ".gif"];
    if (!file) {
      throw new Error("Tienes que subir una imagen");
    } else {
      let fileExtension = path.extname(file.originalname);
      if (!acceptedExtensions.includes(fileExtension)) {
        throw new Error(
          "Las extensiones de archivo permitidas son ${acceptedExtensions.join(",
          ")}"
        );
      }
    }
    return true;
  }),
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
