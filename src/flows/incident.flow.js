const _ = require('lodash');
const moment = require('moment');

const IncidentCategoryType = require('../enums/incident-category-type');
const IncidentSubcategoryType = require('../enums/incident-subcategory-type');
const IncidentMessages = require('../messages/incident.message');
const SlackService = require('../services/slack.service');

module.exports = (slapp) => {
  slapp.command('/tracker', /^report/, (msg) => {
    const state = {
      timestamp: moment.utc(),
      username: msg.body.user_name,
    };

    msg.respond(IncidentMessages.CATEGORY_SELECTION)
      .route('incidentCategorySelectionCallback', state);
  });

  slapp.route('incidentCategorySelectionCallback', (msg, state) => {
    if (msg.type !== 'action') {
      msg.say('Please choose a category.')
        .route('incidentCategorySelectionCallback', state);

      return;
    }

    const category = msg.body.actions[0].value;
    let message;

    state.category = category;

    switch (category) {
      case IncidentCategoryType.EXCLUSION:
        message = IncidentMessages.EXCLUSION_SUBCATEGORY_SELECTION;
        break;

      case IncidentCategoryType.GENDER_STEREOTYPE:
        message = IncidentMessages.GENDER_STEREOTYPE_SUBCATEGORY_SELECTION;
        break;

      case IncidentCategoryType.HARASSMENT:
        message = IncidentMessages.HARASSMENT_SUBCATEGORY_SELECTION;
        break;

      case IncidentCategoryType.OTHER:
      default:
        offenderSelection(msg, state);

        return;
    }

    msg.respond(message)
      .route('incidentSubcategorySelectionCallback', state);
  });

  slapp.route('incidentSubcategorySelectionCallback', (msg, state) => {
    if (msg.type !== 'action') {
      msg.say('Please choose a subcategory.')
        .route('incidentSubcategorySelectionCallback', state);

      return;
    }

    const subcategory = msg.body.actions[0].value;

    state.subcategory = subcategory;

    offenderSelection(msg, state);
  });

  slapp.route('incidentOffenderSelectionCallback', (msg, state) => {
    if (!msg.isBaseMessage()) {
      msg.route('incidentOffenderSelectionCallback', state);
      return;
    }

    let user = msg.body.event.text;
    const token = msg.meta.bot_token || msg.meta.app_token;

    if (user.search(/<U.*>/) !== -1) {
      msg.say('Please tag a valid @username.')
        .route('incidentOffenderSelectionCallback', state);

      return;
    }

    user = user.replace(/<@|>/gi, '');

    SlackService.getUserInfo(token, user)
      .then((userInfo) => {
        state.offender = {
          firstName: userInfo.profile.first_name,
          lastName: userInfo.profile.last_name,
        };

        msg.say(IncidentMessages.INCIDENT_DESCRIPTION)
          .route('incidentDescriptionCallback', state);
      });
  });

  slapp.route('incidentDescriptionCallback', (msg, state) => {
    if (!msg.isBaseMessage()) {
      msg.route('incidentDescriptionCallback', state);
      return;
    }

    const text = msg.body.event.text;
    state.description = state.description || '';

    // Searching for `done` to mark completion.
    if (text.search(/^\s*done\s*$/gi) === -1) {
      state.description += ` ${text}`;
      msg.route('incidentDescriptionCallback', state);
      return;
    }

    // Trimming double whitespace.
    state.description = state.description.replace(/\s\s+/g, ' ');

    msg.say(IncidentMessages.ANONYMOUS_SELECTION)
      .route('incidentAnonymousSelectionCallback', state);
  });

  slapp.route('incidentAnonymousSelectionCallback', (msg, state) => {
    if (msg.type !== 'action') {
      msg.say('Please choose an option.')
        .route('incidentAnonymousSelectionCallback', state);

      return;
    }

    const anonymous = msg.body.actions[0].value === 'yes';

    state.anonymous = anonymous;

    msg.say(generateIncidentSummary(state))
      .route('incidentSummaryCallback', state);
  });

  slapp.route('incidentSummaryCallback', (msg, state) => {
    if (msg.type !== 'action') {
      msg.say('Please choose an option.')
        .route('incidentSummaryCallback', state);

      return;
    }


  });
};

function offenderSelection (msg, state) {
  msg.say(generateComplaintTypeSummary(state));

  _.delay(() => {
    msg.say(IncidentMessages.OFFENDER_SELECTION)
      .route('incidentOffenderSelectionCallback', state);
  }, 2000);
}

function generateIncidentSummary(state) {
  const summary = _.cloneDeep(IncidentMessages.INCIDENT_SUMMARY);

  summary.text = summary.text.replace(/\[username\]/gi, state.username);
  summary.fields = [{
    title: 'Report Type',
    value: generateComplaintType(state),
  }, {
    title: 'Report Description',
    value: state.description,
  }, {
    title: 'Other Party',
    value: `${state.offender.firstName} ${state.offender.lastName}`,
  }, {
    title: 'Include Name',
    value: state.anonymous ? 'No' : 'Yes',
  }];

  return summary;
}

function generateComplaintTypeSummary (state) {
  const summary = _.cloneDeep(IncidentMessages.COMPLAINT_TYPE_SUMMARY);

  summary.text = summary.text.replace(/\[complaintType\]/gi, generateComplaintType(state));

  return summary;
}

function generateComplaintType (state) {
  let complaintType = state.category;

  if (state.subcategory) {
    complaintType += ` - ${state.subcategory}`;
  }

  return complaintType;
}

