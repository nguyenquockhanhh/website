const mongoose = require('mongoose');
const cateSchema = new mongoose.Schema({
    name:   String,
  });


module.exports = mongoose.model('category', cateSchema);
