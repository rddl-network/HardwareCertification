const { assert } = require('chai');

const uBoot = require('../src/u_boot.js');

describe('Runs through cryptography steps', () => {
  it('sha256 hash a value', () => {
    uBoot.generatecryptoId();
  });
  it('can`t create a seed phrase - invalid mnemonic', () => {
    assert.isFalse(uBoot.generateSeed('false mnemonic'));
  });
  it.only('uses a mnemonic as a key to generate a seed', () => {
    //    const mnemonic = uBoot.generateMnemonic();
    const oldMnemonic =
      'govern join crop mistake dry point execute famous kit method hedgehog hold meat critic section gauge menu famous journey frog addict powder dentist trip';

    const seed = uBoot.generateHash(oldMnemonic); // uBoot.generateSeed(mnemonic);
    // const oldSeed =
    //   '6a2b64b02506f4f6138fd819d0282c800eacd6dc809505f6cb00462a618b307cc0043993a21299ed7fe9342c57a06b82f80d2f301bd7b0f87a6bc9953012af96';

    uBoot.generateKeypair(seed);
  });
  it('can`t recover from wrong mnemonic', () => {
    const oldMnemonic =
      'govern join crop mistake dry point execute famous kit method hedgehog hold meat critic section gauge menu famous journey frog addict powder dentist trip';
    const oldSeed =
      '6a2b64b02506f4f6138fd819d0282c800eacd6dc809505f6cb00462a618b307cc0043993a21299ed7fe9342c57a06b82f80d2f301bd7b0f87a6bc9953012af96';
    assert.notEqual(oldSeed, uBoot.generateSeed(oldMnemonic));
    // const newMnemonic = uBoot.generateMnemonic();
  });
  it('can recover from mnemonic', () => {
    const oldMnemonic =
      'join govern crop mistake dry point execute famous kit method hedgehog hold meat critic section gauge menu famous journey frog addict powder dentist trip';
    const oldSeed =
      '6a2b64b02506f4f6138fd819d0282c800eacd6dc809505f6cb00462a618b307cc0043993a21299ed7fe9342c57a06b82f80d2f301bd7b0f87a6bc9953012af96';
    assert.equal(oldSeed, uBoot.generateSeed(oldMnemonic));
    // const newMnemonic = uBoot.generateMnemonic();
  });
});
describe('Runs through certification', () => {});

