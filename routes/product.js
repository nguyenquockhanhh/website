var express = require('express');
var router = express.Router();
const ProductModel = require('../schemas/product')

// Lấy tất cả dữ liệu
router.get("/", async function (req, res, next) {
  try {
    const userdata = await ProductModel.find().lean();
      res.json(userdata);
  } catch (error) {
    console.error(error); // Log lỗi nếu có
    res.status(500).send("Server Error"); // Trả về lỗi 500 nếu có lỗi xảy ra
  }
});


module.exports = router;
