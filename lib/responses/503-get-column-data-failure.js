// 503: get_column_data_failure

function translate (data) {
  // TODO: Interpret data

  return {
    event: 'get_column_data_failure',
    data
  };
}

module.exports = translate;
