'use strict';

const bip39 = require('bip39');
const { pki, random } = require('node-forge');

const convert = require('./convert.js');

/**
 * 1. Generate mnemonic
 * 2. Create cryptographic ID using Edwards curve (ed25519)
 */

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
  generateRsaKeypair(seed) {
    const prng = random.createInstance();
    prng.seedFileSync = () => seed;
    const { privateKey, publicKey } = pki.rsa.generateKeyPair({
      bits: 4096,
      prng,
      workers: -1,
    });
    return { privateKey, publicKey };
  },
  generateEd25519Keypair(seed) {
    const { privateKey, publicKey } = pki.ed25519.generateKeyPair({
      seed: convert.hexToUint8Array(seed),
    });
    return { privateKey, publicKey };
  },
  ed25519KeypairFromMnemonic(mnemonic) {
    return this.generateEd25519Keypair(this.generateSeed(mnemonic));
  },
};

module.exports = uBoot;
