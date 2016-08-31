const messages = require('./messages');
const encode   = require('./encode');

function createMessage ({ code, data, sequenceNumber }) {
  const message = messages[code];

  if (message) {
    const createdMessage = message(data);
    const encodedMessage = encode(createdMessage.commandNumber, createdMessage.data, sequenceNumber);

    return encodedMessage;
  } else {
    return [];
  }
}

module.exports = createMessage;
