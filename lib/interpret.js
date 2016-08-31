const responses = require('./responses');

function interpret (commandNumber, data, sequenceNumber) {
  const response = responses[commandNumber];

  if (response) {
    const event = response(data);

    event.sequenceNumber = sequenceNumber;

    return event;
  } else {
    return {
      event: 'unknown',
      commandNumber,
      data,
      sequenceNumber: 999
    };
  }
}

module.exports = interpret;
