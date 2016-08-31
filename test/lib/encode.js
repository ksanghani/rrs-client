const expect = require('chai').expect;
const encode = require('../../lib').encode;

describe('encode', () => {
  it('should create encoded message from commandNumber and data', () => {
    const commandNumber = 104;
    const data = '';

    const message = encode(commandNumber, data);

    expect(message).to.eql([ 2, 48, 48, 52, 128, 49, 48, 52, 3, 66, 67, 51, 69 ]);
  });

  it('should default data to empty string', () => {
    const commandNumber = 100;

    const message = encode(commandNumber);

    expect(message).to.eql([ 2, 48, 48, 52, 128, 49, 48, 48, 3, 66, 67, 51, 65 ]);
  });

  it('should accept sequence number', () => {
    const commandNumber = 0;

    const message = encode(commandNumber, '', 32);

    expect(message).to.eql([ 2, 48, 48, 52, 32, 48, 48, 48, 3, 65, 65, 51, 53 ]);
  });
});
