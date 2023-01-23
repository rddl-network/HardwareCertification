'use strict';

const bip39 = require('bip39');

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
    if (mnemonic.trim().split(/\s+/g).length >= 12) {
      return bip39.mnemonicToSeedSync(mnemonic).toString('hex');
    } else {
      return false;
    }
  },
  generatecryptoId() {
    const ecdhObj = crypto.createECDH(curve);
    crypto.ecdhObj.generateKeys();
    return ecdhObj;
  },
};

module.exports = uBoot;
