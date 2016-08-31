// 101: dispense

function create (data) {
  const door = data.door.toString();
  const shelf = data.shelf.toString();
  const divider = data.divider.toString();

  return {
    commandNumber: 101,
    data: door + shelf + divider
  };
}

module.exports = create;
