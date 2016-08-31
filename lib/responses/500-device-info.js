// 504: device_info

const models = {
  A1: 'ASV1800',
  A2: 'ASV2003',
  AX: 'ASVXXXX'
};

function translate (data) {
  const model = models[data.slice(3, 5)];
  const version = data.slice(6, 11);
  const status = data.slice(12, 14) === 'I0' ? 'normal' : 'abnormal';
  const isRefrigerating = data.slice(15, 17) === 'T1' ? true : false;

  return {
    event: 'device_info',
    model,
    version,
    status,
    isRefrigerating
  };
}

module.exports = translate;
