const expect    = require('chai').expect;
const interpret = require('../../lib').interpret;

describe('interpret', () => {
  it('should return unknown events with data', () => {
    const response = interpret(999, 'UNKNOWN');

    expect(response.event).to.equal('unknown');
    expect(response.commandNumber).to.equal(999);
    expect(response.data).to.equal('UNKNOWN');
    expect(response.sequenceNumber).to.equal(999);
  });

  it('should interpret 000: ack', () => {
    const response = interpret(0);

    expect(response.event).to.equal('ack');
  });

  it('should interpret 001: nak', () => {
    const response = interpret(1);

    expect(response.event).to.equal('nak');
  });

  it('should interpret 002: busy', () => {
    const response = interpret(2);

    expect(response.event).to.equal('busy');
  });

  it('should interpret 500: device_info', () => {
    const response = interpret(500, 'P1,A1,V0509,I0,T1,');

    expect(response.event).to.equal('device_info');
    expect(response.model).to.equal('ASV1800');
    expect(response.version).to.equal('V0509');
    expect(response.status).to.equal('normal');
    expect(response.isRefrigerating).to.be.true;
  });

  it('should interpret 504: dispense_status', () => {
    const response = interpret(504, 0);

    expect(response.event).to.equal('dispense_status');
    expect(response.status).to.equal('standby');
  });

  it('should interpret 505: dispense_failure', () => {
    const response = interpret(505, 1);

    expect(response.event).to.equal('dispense_failure');
    expect(response.error).to.equal('sold_out');
  });

  it ('should interpret 506: error', () => {
    const response = interpret(506, '0051,');

    expect(response.event).to.equal('error');
    expect(response.messages).to.eql([ 'setting_data_error' ]);
  });

  it('should interpret 507: door_status', () => {
    const response = interpret(507, '1,1,1,0,');

    expect(response.event).to.equal('door_status');
    expect(response.doors.left).to.equal('closed');
    expect(response.doors.right).to.equal('closed');
    expect(response.doors.control).to.equal('closed');
    expect(response.doors.dispense).to.equal('open');
  });

  it('should interpret 508: sold_out_columns', () => {
    const response = interpret(508, '263,253,');

    expect(response.event).to.equal('sold_out_columns');
    expect(response.columns).to.eql([ 263, 253 ]);
  });

  it('should interpret 509: room_temperature', () => {
    const response = interpret(509, '031,,,');

    expect(response.event).to.equal('room_temperature');
    expect(response.temperature).to.equal(31);
  });

  it('should interpret 510: bucket_status', () => {
    let response = interpret(510, '1');

    expect(response.event).to.equal('bucket_status');
    expect(response.isEmpty).to.be.false;

    response = interpret(510, '0');

    expect(response.event).to.equal('bucket_status');
    expect(response.isEmpty).to.be.true;
  });
});
