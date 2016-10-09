const IncidentCategoryType = require('../enums/incident-category-type');
const IncidentSubcategoryType = require('../enums/incident-subcategory-type');

module.exports = {
  CATEGORY_SELECTION: {
    text: 'I can help you report bias that you\'ve experienced. I\'m sorry to hear that something happened to you. What type of report would you like to make?',
    attachments: [{
      fallback: 'Select a report type',
      callback_id: 'complaint_category_selection',
      actions: [{
        name: 'category',
        text: 'Exclusion',
        type: 'button',
        value: IncidentCategoryType.EXCLUSION,
      }, {
        name: 'category',
        text: 'Gender Stereotype',
        type: 'button',
        value: IncidentCategoryType.GENDER_STEREOTYPE,
      }, {
        name: 'category',
        text: 'Harassment',
        type: 'button',
        value: IncidentCategoryType.HARASSMENT,
      }, {
        name: 'category',
        text: 'Other',
        type: 'button',
        value: IncidentCategoryType.OTHER,
      }],
    }],
  },
  EXCLUSION_SUBCATEGORY_SELECTION: {
    text: 'What type of exclusionary behavior happened?',
    attachments: [{
      fallback: 'Select an exclusion subcategory',
      callback_id: 'exclusion_subcategory_selection',
      actions: [{
        name: 'subcategory',
        text: 'Interrupted',
        type: 'button',
        value: IncidentSubcategoryType.EXCLUSION_INTERRUPTED,
      }, {
        name: 'subcategory',
        text: 'Passed Over',
        type: 'button',
        value: IncidentSubcategoryType.EXCLUSION_PASSED_OVER,
      }, {
        name: 'subcategory',
        text: 'Other',
        type: 'button',
        value: IncidentSubcategoryType.EXCLUSION_OTHER,
      }],
    }],
  },
  GENDER_STEREOTYPE_SUBCATEGORY_SELECTION: {
    text: 'What type of gender stereotyping happened?',
    attachments: [{
      fallback: 'Select a gender stereotype subcategory',
      callback_id: 'gender_stereotype_subcategory_selection',
      actions: [{
        name: 'subcategory',
        text: 'Ability / Character',
        type: 'button',
        value: IncidentSubcategoryType.GENDER_STEREOTYPE_ASSUMPTION,
      }, {
        name: 'subcategory',
        text: 'Menial Tasks',
        type: 'button',
        value: IncidentSubcategoryType.GENDER_STEREOTYPE_MENIAL,
      }, {
        name: 'subcategory',
        text: 'Other',
        type: 'button',
        value: IncidentSubcategoryType.GENDER_STEREOTYPE_OTHER,
      }],
    }],
  },
  HARASSMENT_SUBCATEGORY_SELECTION: {
    text: 'What type of harassment happened?',
    attachments: [{
      fallback: 'Select a harassment subcategory',
      callback_id: 'harassment_subcategory_selection',
      actions: [{
        name: 'subcategory',
        text: 'Physical',
        type: 'button',
        value: IncidentSubcategoryType.HARASSMENT_PHYSICAL,
      }, {
        name: 'subcategory',
        text: 'Verbal',
        type: 'button',
        value: IncidentSubcategoryType.HARASSMENT_VERBAL,
      }, {
        name: 'subcategory',
        text: 'Other',
        type: 'button',
        value: IncidentSubcategoryType.HARASSMENT_OTHER,
      }],
    }],
  },
  COMPLAINT_TYPE_SUMMARY: {
    text: ':white_check_mark: You\’re making a report about [complaintType].',
  },
  OFFENDER_SELECTION: {
    text: 'Tag the @username of whoever was involved. Don\'t worry - they will not be notified.',
  },
  INCIDENT_DESCRIPTION: {
    text: 'Can you describe what happened in a few sentences? Enter `done` as a separate message when finished.',
  },
  ANONYMOUS_SELECTION: {
    text: 'Would you like your name attached to this report? This is helpful if you\'d like management to address your concerns directly. If not, your information will be anonymized using your rank and department.',
    attachments: [{
      fallback: 'Include your name on this report or not',
      callback_id: 'anonymous_selection',
      actions: [{
        name: 'anonymous',
        text: 'Name Included',
        type: 'button',
        value: 'no',
      }, {
        name: 'anonymous',
        text: 'Anonymized',
        type: 'button',
        value: 'yes',
      }],
    }],
  },
  ANONYMOUS_SELECTION_SUMMARY: {
    text: ':white_check_mark: You\’re making this report [complaintType].',
  },
  INCIDENT_SUMMARY: {
    text: 'Ok @[username]. Here\'s the report I have from you:',
    attachments: [{
      fallback: 'Report Summary',
      callback_id: 'report_summary',
      fields: [],
      actions: [{
        name: 'submit',
        text: 'Submit',
        type: 'button',
        value: 'yes',
      }, {
        name: 'submit',
        text: 'Cancel',
        type: 'button',
        value: 'no',
      }],
    }],
  },
};
