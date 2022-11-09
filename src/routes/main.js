const express = require("express");

const mainController = require("../controllers/mainController");

let router = express.Router();



router.get("/", mainController.index);

module.exports = router;
