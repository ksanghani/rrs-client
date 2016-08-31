// 000: ack

function create (data, sequenceNumber) {
  return {
    commandNumber: 0,
    sequenceNumber
  };
}

module.exports = create;
