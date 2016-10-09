const _ = require('lodash');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const rp = require('request-promise');

const Employee = require('../src/models/employee.model');

require('dotenv').config({
  path: '../.env',
});

const MONGO_URI = process.env.MONGO_URI;
const TEAM_ID = mongoose.Types.ObjectId('57f9bba5919489743a809e5e');

// Checking presence of valid environmental variables.
if (!(MONGO_URI)) {
  console.error('Missing config values');
  process.exit(1);
}

// Setting bluebird as the default mongoose promise implementation.
mongoose.Promise = Promise;
mongoose.connect(MONGO_URI)
  .then(() => Employee.remove({}))
  .then(() => {
    return Promise.join(generateCTO(), fetchRandomNames(), (cto, randomNames) => {
      return generateManagers(cto.id, randomNames)
        .then((managers) => {
          return Promise.all(_.map(managers, (manager) => {
            return generateEmployees(manager.id, randomNames);
          }));
      });
    });
  })
  .then(() => {
    process.exit(0);
  });

function generateCTO() {
  const cto = new Employee({
    firstName: 'Ada',
    lastName: 'Lovelace',
    title: 'CTO',
    department: 'Engineering',
    rank: 'Executive',
    teamId: TEAM_ID,
  });

  return cto.save();
}

function generateManagers(reportToId, randomNames) {
  const promisesOfManagers = [];

  promisesOfManagers.push((new Employee({
    firstName: 'Simon',
    lastName: 'Tam',
    title: 'Senior Developer',
    department: 'Engineering',
    rank: 'Manager',
    teamId: TEAM_ID,
  })).save(), (new Employee({
    firstName: 'Emilie',
    lastName: 'Hsieh',
    title: 'Senior Developer',
    department: 'Engineering',
    rank: 'Manager',
    teamId: TEAM_ID,
  })).save());

  _.times(_.random(1, 3), () => {
    const randomName = randomNames.pop().name;

    promisesOfManagers.push((new Employee({
      firstName: _.capitalize(randomName.first),
      lastName: _.capitalize(randomName.last),
      title: 'Senior Developer',
      department: 'Engineering',
      rank: 'Manager',
      reportTo: reportToId,
      teamId: TEAM_ID,
    })).save());
  });

  return Promise.all(promisesOfManagers);
}

function generateEmployees(reportToId, randomNames) {
  const promisesOfEmployees = [];
  const titles = ['Junior Developer', 'Developer'];

  _.times(_.random(2, 8), () => {
    const randomName = randomNames.pop().name;

    promisesOfEmployees.push((new Employee({
      firstName: _.capitalize(randomName.first),
      lastName: _.capitalize(randomName.last),
      title: titles[_.random(0, titles.length - 1)],
      department: 'Engineering',
      rank: 'Entry',
      reportTo: reportToId,
      teamId: TEAM_ID,
    })).save());
  });

  return Promise.all(promisesOfEmployees);
}

function fetchRandomNames() {
  return rp.get({
    uri: 'http://api.randomuser.me/?inc=name&results=100&nat=us&noinfo',
    json: true,
  }).then((response) => response.results);
}
