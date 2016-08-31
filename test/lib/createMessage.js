const expect        = require('chai').expect;
const createMessage = require('../../lib').createMessage;

describe('createMessage', () => {
  it('should return empty array for unknown message code', () => {
    const code = 'not_implemented';

    const message = createMessage(code);

    expect(message).to.eql([]);
  });

  it('should create 000: ack message', () => {
    const code = 'ack';
    const sequenceNumber = 32;

    const message = createMessage({ code, sequenceNumber });

    expect(message).to.eql([ 2, 48, 48, 52, 32, 48, 48, 48, 3, 65, 65, 51, 53 ]);
  });

  it('should create 100: get_column_data message', () => {
    const code = 'get_column_data';

    const message = createMessage({ code });

    expect(message).to.eql([ 2, 48, 48, 52, 128, 49, 48, 48, 3, 66, 67, 51, 65 ]);
  });

  it('should create 101: dispense message', () => {
    const code = 'dispense';
    const data = {
        door: 2,
        shelf: 3,
        divider: 3
    };

    const message = createMessage({ code, data });

    expect(message).to.eql([ 2, 48, 48, 55, 128, 49, 48, 49, 50, 51, 51, 3, 51, 66, 70, 57 ]);
  });

  it('should create 102: get_errors message', () => {
    const code = 'get_errors';

    const message = createMessage({ code });

    expect(message).to.eql([ 2, 48, 48, 52, 128, 49, 48, 50, 3, 66, 67, 51, 56 ]);
  });

  it('should create 104: open_dispense_door message', () => {
    const code = 'open_dispense_door';

    const message = createMessage({ code });

    expect(message).to.eql([ 2, 48, 48, 52, 128, 49, 48, 52, 3, 66, 67, 51, 69 ]);
  });

  it('should create 104: close_dispense_door message', () => {
    const code = 'close_dispense_door';

    const message = createMessage({ code });

    expect(message).to.eql([ 2, 48, 48, 52, 128, 49, 48, 53, 3, 66, 67, 51, 70 ]);
  });

  it('should create 108: power_on message', () => {
    const code = 'power_on';

    const message = createMessage({ code });

    expect(message).to.eql([ 2, 48, 48, 52, 128, 49, 48, 56, 3, 66, 67, 51, 50 ]);
  });
});
