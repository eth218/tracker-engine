const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
  category: {
    type: String,
  },
  subcategory: {
    type: String,
  },
  description: {
    type: String,
  },
  anonymous: {
    type: Boolean,
  },
  reporterId: {
    type: mongoose.Types.ObjectId,
  },
  offenderId: {
    type: mongoose.Types.ObjectId,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Incident', incidentSchema);
