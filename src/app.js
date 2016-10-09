const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const Promise = require('bluebird');

require('dotenv').config({
  path: '../.env',
});

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

// Checking presence of valid environmental variables.
if (!(MONGO_URI)) {
  console.error('Missing config values');
  process.exit(1);
}

// Setting bluebird as the default mongoose promise implementation.
mongoose.Promise = Promise;

const app = express();

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true,
}));

// Parse application/json
app.use(bodyParser.json());

// CORS
app.use(cors());

// Routes
app.use('/', require('./routes/slack.route'));

// Start the server after successful connection.
mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log('Tracker Engine is running on port', PORT);
    });
  });


