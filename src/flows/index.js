module.exports = (slapp) => {
  require('./intro.flow')(slapp);
  require('./incident.flow')(slapp);
  require('./dashboard.flow')(slapp);
};
