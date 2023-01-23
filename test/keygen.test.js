const { assert } = require('chai');

const uBoot = require('../src/u_boot.js');

describe('Runs through certification steps', () => {
  it('can`t create a seed phrase - invalid mnemonic', () => {
    assert.isFalse(uBoot.generateSeed('false mnemonic'));
  });
  it('uses a mnemonic as a key to generate a seed', () => {
    const mnemonic = uBoot.generateMnemonic();
    const seed = uBoot.generateSeed(mnemonic);
    console.log(seed);
  });
});
