const r000 = require('./000-ack');
const r001 = require('./001-nak');
const r002 = require('./002-busy');
const r500 = require('./500-device-info');
const r501 = require('./501-column-in-use');
const r502 = require('./502-column-data');
const r503 = require('./503-get-column-data-failure');
const r504 = require('./504-dispense-status');
const r505 = require('./505-dispense-failure');
const r506 = require('./506-error');
const r507 = require('./507-door-status');
const r508 = require('./508-sold-out-columns');
const r509 = require('./509-room-temperature');
const r510 = require('./510-bucket-status');

module.exports = {
    0: r000,
    1: r001,
    2: r002,
  500: r500,
  501: r501,
  502: r502,
  503: r503,
  504: r504,
  505: r505,
  506: r506,
  507: r507,
  508: r508,
  509: r509,
  510: r510
};
