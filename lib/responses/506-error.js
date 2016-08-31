// 506: error

const errors = {
    51: 'setting_data_error',
    60: 'communication_line_error',
    62: 'dispense_slave_error',
    77: 'refrigeration_error',
  1304: 'x-mechanical_error',
  1305: 'x-shelf_sensor_error',
  1306: 'x-column_sensor_error',
  1307: 'y-mechanical_error',
  1308: 'y-shelf_sensor_error',
  1309: 'y-dispense_door_sensor_error',
  1310: 'inner_cabinet_partition_door_motor_error',
  1314: 'merchandise_left_in_bucket',
  1331: 'temperature_1_sensor_error',
  1332: 'temperature_2_sensor_error',
  1333: 'temperature_3_sensor_error',
  1334: 'temperature_4_sensor_error',
  1335: 'temperature_1_sensor_error',
  1336: 'temperature_2_sensor_error',
  1337: 'temperature_3_sensor_error',
  1338: 'temperature_4_sensor_error',
  1372: 'glass_door_error',
  1383: 'bucket_motor_error',
  1384: 'bucket_entrance_sensor_error',
  1385: 'bucket_bottom_sensor_error',
  1386: 'dispense_door_motor_error',
  1387: 'dispense_door_sensor_error'
};

function translate (data) {
  const messages = data
    .split(',')
    .filter(error => error)
    .map(error => errors[parseInt(error)])
    .filter(error => error);

  return {
    event: 'error',
    messages
  };
}

module.exports = translate;
