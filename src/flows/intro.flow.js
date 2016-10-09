const _ = require('lodash');

const IntroMessage = require('../messages/intro.message');

module.exports = (slapp) => {
  slapp.command('/tracker', /^onboard/, (msg) => {
    const response = _.cloneDeep(IntroMessage.INTRO);
    const username = msg.body.user_name;
    const domain = msg.body.team_domain;

    response.text = response.text.replace(/\[username\]/gi, username)
      .replace(/\[domain\]/gi, domain);

    msg.say(response);
  });
};
