const expect = require('chai').expect;
const parse  = require('../../lib').parse;

describe('parse', () => {
  it('should extract data between STX and ETX', () => {
    const response = parse([ 2, 48, 48, 52, 128, 48, 48, 48, 3, 50, 50, 50, 50 ]);

    expect(response.sequenceNumber).to.equal(128);
    expect(response.commandNumber).to.equal(0);
    expect(response.data).to.equal('');
    expect(response.crc).to.eql([ 50, 50, 50, 50 ]);
  });
});
