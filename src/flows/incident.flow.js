const moment = require('moment');

const IncidentMessages = require('../messages/incident.message.json');

module.exports = (slapp) => {
  slapp.command('/tracker', /^report/, (msg) => {
    const state = {
      timestamp: moment.utc(),
    };

    msg.say(IncidentMessages.INIT)
      .route('incidentInitCallback', state);
  });

  slapp.route('incidentInitCallback', (msg, state) => {

  });
};
