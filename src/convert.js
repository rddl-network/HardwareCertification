'use strict';

const crypto = require('crypto');

const convert = {
  hexToBytes(hex) {
    for (var bytes = [], c = 0; c < hex.length; c += 2)
      bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
  },
  stringToHash(input) {
    return crypto.createHash('sha256').update(input).digest('hex');
  },
  hexToUint8Array(hex) {
    let unsignedIntegers = hex.match(/[\dA-F]{2}/gi).map(function (s) {
      return parseInt(s, 16);
    });
    return new Uint8Array(unsignedIntegers);
  },
};

module.exports = convert;
