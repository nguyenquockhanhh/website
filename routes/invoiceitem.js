var express = require('express');
var router = express.Router();
const invoiceitemModel = require('../schemas/invoiceitem')

//localhost:3000/users
/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    const userdata = await invoiceitemModel.find().lean();
    res.json(userdata);
  } catch (error) {
    console.error(error); // Log lỗi nếu có
    res.status(500).send('Server Error'); // Trả về lỗi 500 nếu có lỗi xảy ra
  }
});
router.get('/add', function(req, res, next) {
  res.send('respond with a resource add');
});

module.exports = router;
