// 505: dispense_failure

const status = {
  1: 'sold_out',
  2: 'column_sold_out',
  3: 'column_not_in_use',
  4: 'bucket_not_empty',
  5: 'hard_error',
  6: 'product_remaining'
};

function translate (data) {
  return {
    event: 'dispense_failure',
    error: status[data],
  };
}

module.exports = translate;
