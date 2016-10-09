const Promise = require('bluebird');
const rp = require('request-promise');
const slack = require('slack');

const Team = require('../models/team.model');

const SLACK_CLIENT_ID = process.env.SLACK_CLIENT_ID;
const SLACK_CLIENT_SECRET = process.env.SLACK_CLIENT_SECRET;

function authorize(code) {
  const url = `https://slack.com/api/oauth.access?client_id=${SLACK_CLIENT_ID}&client_secret=${SLACK_CLIENT_SECRET}&code=${code}`;

  return rp.get({
    uri: url,
    json: true,
  }).then(response => createTeam(response))
    .catch((error) => {
      console.error(error);
    });
}

function createTeam(response) {
  return Team.findOneAndUpdate({
    teamId: response.team_id,
  }, {
    accessToken: response.access_token,
    teamName: response.team_name,
    teamId: response.team_id,
    bot: {
      userId: response.bot.bot_user_id,
      accessToken: response.bot.bot_access_token,
    },
  }, {
    upsert: true,
  });
}

function slappContext(req, res, next) {
  const meta = req.slapp.meta;

  Team.findOne({
    teamId: meta.team_id,
  }).then((team) => {
    req.slapp.meta = Object.assign(req.slapp.meta, {
      app_token: team.accessToken,
      bot_token: team.bot.accessToken,
      bot_user_id: team.bot.userId,
    });

    next();
  });
}

function getUserInfo(token, user) {
  return new Promise((resolve, reject) => {
    slack.users.info({
      token,
      user,
    }, (err, data) => {
      if (err) {
        return reject(err);
      }

      return resolve(data.user);
    });
  });
}

module.exports = {
  authorize,
  slappContext,
  getUserInfo,
};
