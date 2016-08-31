// 508: get_sold_out_columns

function translate (data) {
  const columns = data
    .split(',')
    .filter(column => column)
    .map(column => parseInt(column))
    .filter(column => column);

  return {
    event: 'sold_out_columns',
    columns,
  };
}

module.exports = translate;
