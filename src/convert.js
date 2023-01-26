'use strict';

const crypto = require('crypto');

const convert = {
  hexToUint8Array(hex) {
    let unsignedIntegers = hex.match(/[\dA-F]{2}/gi).map(function (s) {
      return parseInt(s, 16);
    });
    return new Uint8Array(unsignedIntegers);
  },
};

module.exports = convert;
