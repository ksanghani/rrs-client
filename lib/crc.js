// modified crc16 ccitt

function crc (previous = 0, byte = 0) {
  let x = byte;

  x = (x << 16) + previous;

  for (let i = 0; i < 8; i++) {
    if (x & 0x01 !== 0) {
      x = x >> 1 ^ 0x8408;
    } else {
      x = x >> 1;
    }
  }

  return x;
}

module.exports = crc;
