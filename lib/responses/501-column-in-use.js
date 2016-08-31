// 501: column_in_use

function translate (data) {
  // TODO: Interpret data

  return {
    event: 'column_in_use',
    columns: data,
  };
}

module.exports = translate;
