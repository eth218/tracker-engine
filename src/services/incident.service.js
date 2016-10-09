const _ = require('lodash');
const Promise = require('bluebird');

const EmployeeService = require('./employee.service');
const Incident = require('../models/incident.model');
const IncidentCategoryType = require('../enums/incident-category-type');
const IncidentSubcategoryType = require('../enums/incident-subcategory-type');

function createIncident(state) {
  if (!isStateValid(state)) {
    throw new Error('Cannot create Incident from invalid state.');
  }

  return Promise.join(EmployeeService.findEmployeeByName(state.reporter.firstName, state.reporter.lastName),
    EmployeeService.findEmployeeByName(state.offender.firstName, state.offender.lastName),
    (reporterUser, offenderUser) => {
      if (!reporterUser || !offenderUser) {
        throw new Error('Unable to find specified users in the system.');
      }

      return Incident.create({
        category: state.category,
        subcategory: state.subcategory,
        description: state.description,
        anonymous: state.anonymous,
        reporterId: reporterUser.id,
        offenderId: offenderUser.id,
        teamId: reporterUser.teamId,
      });
    });
}

function isStateValid(state) {
  return state.category
    && !_.isEmpty(state.offender)
    && !_.isUndefined(state.description)
    && !_.isUndefined(state.anonymous);
}

const incidentCategoryTypeDisplayMap = {};
incidentCategoryTypeDisplayMap[IncidentCategoryType.EXCLUSION] = 'Harassment';
incidentCategoryTypeDisplayMap[IncidentCategoryType.GENDER_STEREOTYPE] = 'Gender Stereotype';
incidentCategoryTypeDisplayMap[IncidentCategoryType.HARASSMENT] = 'Harassment';
incidentCategoryTypeDisplayMap[IncidentCategoryType.OTHER] = 'Other';

function translateIncidentCategoryType(categoryType) {
  return incidentCategoryTypeDisplayMap[categoryType];
}

const incidentSubcategoryTypeDisplayMap = {};
incidentSubcategoryTypeDisplayMap[IncidentSubcategoryType.EXCLUSION_INTERRUPTED] = 'Being Interrupted';
incidentSubcategoryTypeDisplayMap[IncidentSubcategoryType.EXCLUSION_PASSED_OVER] = 'Being Passed Over';
incidentSubcategoryTypeDisplayMap[IncidentSubcategoryType.EXCLUSION_OTHER] = 'Other';
incidentSubcategoryTypeDisplayMap[IncidentSubcategoryType.GENDER_STEREOTYPE_ASSUMPTION] = 'Gender Assumptions Made';
incidentSubcategoryTypeDisplayMap[IncidentSubcategoryType.GENDER_STEREOTYPE_MENIAL] = 'Doing Menial Tasks';
incidentSubcategoryTypeDisplayMap[IncidentSubcategoryType.GENDER_STEREOTYPE_OTHER] = 'Other';
incidentSubcategoryTypeDisplayMap[IncidentSubcategoryType.HARASSMENT_PHYSICAL] = 'Physical Action';
incidentSubcategoryTypeDisplayMap[IncidentSubcategoryType.HARASSMENT_VERBAL] = 'Verbal Action';
incidentSubcategoryTypeDisplayMap[IncidentSubcategoryType.HARASSMENT_OTHER] = 'Other';

function translateIncidentSubcategoryType(subcategoryType) {
  return incidentSubcategoryTypeDisplayMap[subcategoryType];
}

module.exports = {
  createIncident,
  translateIncidentCategoryType,
  translateIncidentSubcategoryType,
};
