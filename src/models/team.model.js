const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  accessToken: {
    type: String,
  },
  teamName: {
    type: String,
  },
  teamId: {
    type: String,
  },
  bot: {
    type: {
      userId: {
        type: String,
      },
      accessToken: {
        type: String,
      },
    },
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Team', teamSchema);
