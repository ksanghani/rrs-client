// 509: room_temperature

function translate (data) {
  return {
    event: 'room_temperature',
    temperature: parseInt(data.slice(0,3))
  };
}

module.exports = translate;
