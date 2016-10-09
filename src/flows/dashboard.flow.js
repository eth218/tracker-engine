const _ = require('lodash');

const DashboardType = require('../enums/dashboard-type');
const DashboardMessage = require('../messages/dashboard.message');

module.exports = (slapp) => {
  slapp.command('/tracker', /^dashboard (.*)/, (msg, text, dashboardType) => {
    let message;

    switch (dashboardType.trim().toLowerCase()) {
      case DashboardType.DASHBOARD_MONTHLY:
        message = DashboardMessage.DASHBOARD_MONTHLY;
        break;
      case DashboardType.DASHBOARD_RANK:
        message = DashboardMessage.DASHBOARD_RANK;
        break;
      default:
        msg.respond(`${dashboardType} is not a valid dashboard type.`);
        return;
    }

    msg.respond(message);
  });
};
