const expect = require('chai').expect;
const crc    = require('../../lib').crc;

describe('crc', () => {
  it('should calculate crc value', () => {
    let hash = crc(0, 48);

    expect(hash).to.equal(12288);

    hash = crc(hash, 48);

    expect(hash).to.equal(12336);
  });
});
