const mongoose = require('mongoose');

const goodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  weight: { type: Number, required: true },
  expiryDate: { type: Date, required: true },
  stockAmount: { type: Number, required: true },
});

module.exports = mongoose.model('Good', goodSchema);
