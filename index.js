const SerialPort    = require('serialport');
const parse         = require('./lib').parse;
const interpret     = require('./lib').interpret;
const createMessage = require('./lib').createMessage;
const debug         = require('debug')('fixture:rrs');
const parsers       = require('./lib/parsers');

class RoboticRetrievalSystem {
  constructor () {
    this.queue = [];
    this.device = null;

    let sequenceNumber = 239;
    const assignNextSequenceNumber = (command) => {
      sequenceNumber++;

      if (sequenceNumber > 239)
        sequenceNumber = 128;

      command.sequenceNumber = sequenceNumber;
      command.retryCount = 0;
    };

    this.queue.push = function () {
      assignNextSequenceNumber(...arguments);

      return Array.prototype.push.apply(this, arguments);
    };

    this.queue.unshift = function () {
      assignNextSequenceNumber(...arguments);

      return Array.prototype.unshift.apply(this, arguments);
    };

    SerialPort.list((err, ports) => {
      const vendorId = '0x067b';
      const productId = '0x2303';

      const port = ports
        .filter(port => port.vendorId === vendorId &&
                        port.productId === productId)[0];

      if (!port) {
        return debug('No port found');
      }

      this.device = new SerialPort(port.comName, {
        rtscts: true,
        parser: parsers.sanyo()
      });

      this.device.on('open', (err) => {
        if (!err)
          debug('Connected');
      });

      this.device.on('error', (err) => debug(err));

      this.device.on('disconnect', () => debug('Disconnected'));

      this.device.on('data', (raw) => {
        const { commandNumber, data, sequenceNumber } = parse(raw);
        const message = interpret(commandNumber, data, sequenceNumber);

        debug(message);

        if (message.event === 'ack') {
          const commandIndex = this.queue
            .findIndex(command => command.sequenceNumber === sequenceNumber);

          if (commandIndex !== -1)
            this.queue.splice(commandIndex, 1);
        }

        if (!['ack', 'nak', 'busy'].includes(message.event)) {
          const ack = createMessage({ code: 'ack', sequenceNumber });

          this._send(ack);
        }
      });

      setInterval(() => {
        if (this.queue.length) {
          debug('Queue', this.queue.map(c => c.code));
          const command = this.queue[0];

          debug(command);

          if (command.retryCount++ === 3) {
            debug('Re-adding command to front of queue');
            this.queue.unshift(this.queue.shift());
          }

          this._send(createMessage(command));
        }
      }, 3000);
    });
  }

  _send (message) {
    this.device.write(message, (err) => {
      if (err) return debug(err);
    });
  }
}

const rrs = new RoboticRetrievalSystem();
