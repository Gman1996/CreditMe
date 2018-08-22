const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const DiscountSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  percentage: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    required: true
  }
});
const Discount = mongoose.model('discount', DiscountSchema);
module.exports = Discount;
