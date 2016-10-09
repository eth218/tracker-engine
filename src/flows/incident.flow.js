const moment = require('moment');

const IncidentCategoryType = require('../enums/incident-category-type');
const IncidentSubcategoryType = require('../enums/incident-subcategory-type');
const IncidentMessages = require('../messages/incident.message');

module.exports = (slapp) => {
  slapp.command('/tracker', /^report/, (msg) => {
    const state = {
      timestamp: moment.utc(),
    };

    msg.respond(IncidentMessages.CATEGORY_SELECTION)
      .route('incidentCategorySelectionCallback', state);
  });

  slapp.route('incidentCategorySelectionCallback', (msg, state) => {
    if (msg.type !== 'action') {
      msg.respond('Please choose a category.')
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
        msg.respond('Okay you chose another');
        return;
    }

    msg.respond(message)
      .route('incidentSubcategorySelectionCallback', state);
  });

  slapp.route('incidentSubcategorySelectionCallback', (msg, state) => {
    if (msg.type !== 'action') {
      msg.respond('Please choose a category.')
        .route('incidentCategorySelectionCallback', state);

      return;
    }

    const category = msg.body.actions[0].value;
    let message;

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
        msg.respond('Okay you chose another');
        return;
    }

    msg.respond(message);
  });
};
