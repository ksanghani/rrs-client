const crc = require('./crc');

function encode (commandNumber, data = '', sequenceNumber = 128) {
  const stx = 2;
  const etx = 3;
  const message = [];

  // sequence number (1) + command number (3) + length of data
  const paddedDataLength = (`000${(1 + 3 + data.length)}`).slice(-3);
  const paddedCommandNumber = (`000${commandNumber}`).slice(-3);

  // add data length ascii values
  for (let i = 0; i < paddedDataLength.length; i++) {
    message.push(paddedDataLength[i].charCodeAt(0));
  }

  // add sequence number ascii value
  message.push(sequenceNumber);

  // add command number ascii values
  for (let i = 0; i < paddedCommandNumber.length; i++) {
    message.push(paddedCommandNumber[i].charCodeAt(0));
  }

  // add data ascii values
  for (let i = 0; i < data.length; i++) {
    message.push(data[i].charCodeAt(0));
  }

  // add etx ascii value
  message.push(etx);

  // compute crc hash
  let hash = 0;

  for (let i = 0; i < message.length; i++) {
    hash = crc(hash, message[i]);
  }

  // add hash ascii values
  const hexHash = hash.toString(16).toUpperCase();

  for (let i = 0; i < hexHash.length; i++) {
    message.push(hexHash.charCodeAt(i));
  }

  // add stx ascii value to beginning
  message.unshift(stx);

  return message;
}

module.exports = encode;
