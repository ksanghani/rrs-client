function parse (message) {
  const startOfText = message.indexOf(2);
  const endOfText = message.indexOf(3);

  const encoded = message.slice(startOfText + 1, endOfText);

  const sequenceNumber = encoded[3];
  const commandNumber = parseInt(String.fromCharCode(...encoded.slice(4, 7)));
  const data = String.fromCharCode(...encoded.slice(7, endOfText - 1));
  const crc = message.slice(message.length - 4);

  const response = {
    sequenceNumber,
    commandNumber,
    data,
    crc
  };

  return response;
}

module.exports = parse;
