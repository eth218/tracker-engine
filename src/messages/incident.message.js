const IncidentCategoryType = require('../enums/incident-category-type');
const IncidentSubcategoryType = require('../enums/incident-subcategory-type');

module.exports = {
  CATEGORY_SELECTION: {
    text: 'I\'m sorry to hear that something happened to you. What type of report would you like to make?',
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
    text: 'I\'m sorry to hear that something happened to you. What type of report would you like to make?',
    attachments: [{
      fallback: 'Select a report type',
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
    text: 'I\'m sorry to hear that something happened to you. What type of report would you like to make?',
    attachments: [{
      fallback: 'Select a report type',
      callback_id: 'gender_stereotype_subcategory_selection',
      actions: [{
        name: 'subcategory',
        text: 'Gender Assumption',
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
    text: 'I\'m sorry to hear that something happened to you. What type of report would you like to make?',
    attachments: [{
      fallback: 'Select a report type',
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
};
