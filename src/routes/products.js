const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const prodController= require(path.resolve(__dirname,'../controllers/prodController'));

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '../public/img'));
    },
    filename: function (req, file, cb) {
      cb(null, 'bici-'+Date.now()+path.extname(file.originalname))
    }
  })
   
  const upload = multer({ storage })

router.get('/products', prodController.index);
router.get('/products/detail/:id', prodController.show)
router.get('/products/create', prodController.create);
router.post('/products/create', upload.single('imagen'), prodController.save);
router.get('/products/edit/:id', prodController.edit);
router.put('/products/edit/:id', upload.single('imagen'), prodController.update);
router.get('/products/delete/:id', prodController.delete);

module.exports = router;