const mongoose = require('mongoose');
const invoiceItemSchema = new mongoose.Schema({
    product_id:   {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'sanpham', // thay 'User' bằng tên của model của bạn nếu khác
    },
    name: String,
    quantity:  Number,
    price:  Number,
    itemTotal: Number
  });


module.exports = mongoose.model('invoiceitem', invoiceItemSchema);
