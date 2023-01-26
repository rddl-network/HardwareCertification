'use strict';

const bip39 = require('bip39');
const { pki } = require('node-forge');

const convert = require('./convert.js');

const uBoot = {
  generateMnemonic(bits = 128) {
    if (bits === 128 || bits === 256) {
      return bip39.generateMnemonic(bits);
    } else {
      console.log('Error: Invalid entropy');
      return 1;
    }
  },
  generateSeed(mnemonic) {
    // Sanitise input
    if (mnemonic.trim().split(/\s+/g).length >= 12) {
      return bip39.mnemonicToSeedSync(mnemonic).toString('hex');
    } else {
      console.log('Error: Invalid mnemonic');
      return 1;
    }
  },
  generateEd25519Keypair(seed) {
    const { privateKey, publicKey } = pki.ed25519.generateKeyPair({
      seed: convert.hexToUint8Array(seed),
    });
    return { privateKey, publicKey };
  },
  ed25519KeypairFromMnemonic(mnemonic) {
    const { privateKey, publicKey } = this.generateEd25519Keypair(
      this.generateSeed(mnemonic),
    );
    return {
      'privateKey': privateKey,
      'publicKey': publicKey,
    };
  },
  signMessage(data, privateKey) {
    return pki.ed25519.sign({
      message: data,
      encoding: 'binary',
      privateKey: privateKey,
    });
  },
  verifyMessage(data, signature, publicKey) {
    var verified = pki.ed25519.verify({
      message: data,
      encoding: 'binary',
      signature: signature,
      publicKey: publicKey,
    });
    return verified;
  },
};

module.exports = uBoot;
