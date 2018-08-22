const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PlanSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  planId: {
    type: String,
    required: true
  }
});
const ActivePlan = mongoose.model('activeplans', PlanSchema);
module.exports = ActivePlan;
