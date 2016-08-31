module.exports = {
  sanyo: () => {
    let buf = [];
    let length = 0;

    return function (emitter, buffer) {
      for (let i = 0; i < buffer.length; i++) {
        buf[buf.length] = buffer[i];

        if (buf.length && buffer[i] === 3) {
          length = buf.length + 4;
        }

        if (length && buf.length === length) {
          emitter.emit('data', buf);
          buf = [];
          length = 0;
        }
      }
    };
  }
};
