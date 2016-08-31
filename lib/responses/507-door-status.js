// 507: door_status

function translate (data) {
  return {
    event: 'door_status',
    doors: {
      left: data[0] === '1' ? 'closed' : 'open',
      right: data[2] === '1' ? 'closed' : 'open',
      control: data[4] === '1' ? 'closed' : 'open',
      dispense: data[6] === '1' ? 'closed' : 'open'
    }
  };
}

module.exports = translate;
