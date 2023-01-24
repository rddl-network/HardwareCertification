'use strict';

const bip39 = require('bip39');
const { pki, random } = require('node-forge');
const fs = require('fs');
const crypto = require('crypto');

// Define curve that is compatible with Mender
const curve = 'ed25519';

/**
 * 1. Generate mnemonic
 * 2. Create cryptographic ID using Edwards curve (ed25519)
 */

const uBoot = {
  generateMnemonic() {
    return bip39.generateMnemonic();
  },
  generateSeed(mnemonic) {
    // Sanitise input
    // if (mnemonic.trim().split(/\s+/g).length >= 12) {
    return bip39.mnemonicToSeedSync(mnemonic).toString('hex');
    // } else {
    //   return false;
    // }
  },
  generateHash(input) {
    return crypto.createHash('sha256').update(input).digest('hex');
  },
  hexToBytes(hex) {
    for (var bytes = [], c = 0; c < hex.length; c += 2)
      bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
  },
  hexToUint8Array(hex) {
    let unsignedIntegers = hex.match(/[\dA-F]{2}/gi).map(function (s) {
      return parseInt(s, 16);
    });
    return new Uint8Array(unsignedIntegers);
  },
  generateKeypair(seed) {
    // const prng = random.createInstance();
    // prng.seedFileSync = () => seed;
    // const { privateKey, publicKey } = pki.rsa.generateKeyPair({
    //   bits: 4096,
    //   prng,
    //   workers: -1,
    // });
    console.log(seed);
    console.log(this.hexToUint8Array(seed));
    const { privateKey, publicKey } = pki.ed25519.generateKeyPair({
      seed: this.hexToUint8Array(seed),
    });
    console.log(privateKey);
    // fs.writeFileSync('./priv.key', JSON.stringify(privateKey.data));
    // fs.writeFileSync('./pub.key', JSON.stringify(publicKey.data));

    console.log(publicKey);
    // console.log(publicKey.toString());
  },
  generatecryptoId() {
    // console.log(crypto.subtle.digest('SHA-256', 'test'));
    console.log(crypto.createHash('sha256').update('input').digest('hex'));

    // const ecdhObj = crypto.createECDH(curve);
    // crypto.ecdhObj.generateKeys();
    // return ecdhObj;
  },
};

module.exports = uBoot;
