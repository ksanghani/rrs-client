// 504: dispense_status

const status = {
  0: 'standby',
  1: 'dispensing',
  2: 'move_to_product',
  3: 'pick_up_product',
  4: 'move_to_door',
  5: 'deliver_product'
};

function translate (data) {
  return {
    event: 'dispense_status',
    status: status[data],
  };
}

module.exports = translate;
