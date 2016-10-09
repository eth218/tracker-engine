const router = require('express').Router();

const SlackService = require('../services/slack.service');

router.get('/slack/oauth', (req, res) => {
  SlackService.authorize(req.query.code)
    .then(() => {
      res.sendStatus(200);
    });
});

router.post('/slack/actions', (req, res) => {

});

module.exports = router;
