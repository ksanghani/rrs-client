// 510: bucket_status

function translate (data) {
  return {
    event: 'bucket_status',
    isEmpty: data[0] !== '1'
  };
}

module.exports = translate;
