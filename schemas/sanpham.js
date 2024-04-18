const mongoose = require('mongoose');
const sanphamSchema = new mongoose.Schema({
    title:  String,
    description:  String,
    price:  Number,
    linkImg:  String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
     }
     
  }, { timestamps: true });


module.exports = mongoose.model('sanpham', sanphamSchema);
