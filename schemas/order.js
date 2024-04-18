const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  invoice_date: String,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', // thay 'User' bằng tên của model của bạn nếu khác
  },
  customer_name: String,
  phone: String ,
  total: Number,
  status: String,
  addrress: String,
  invoice_items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'invoiceitem',
    },
  ],
});

module.exports = mongoose.model('Order', orderSchema);