const { assert } = require('chai');

const uBoot = require('../src/u_boot.js');

describe('Runs through cryptography steps', () => {
  it('cannot generate mnemonic - invalid entropy', () => {
    assert.equal(uBoot.generateMnemonic(384), 1);
  });
  it('generates mnemonic', () => {
    assert.isString(uBoot.generateMnemonic(256));
  });
  it('cannot generate seed - invalid mnemonic', () => {
    assert.equal(uBoot.generateSeed('abcd'), 1);
  });
  it('generates seed', () => {
    assert.isString(uBoot.generateSeed(uBoot.generateMnemonic()));
  });
  it('generates keypair', () => {
    const { privateKey, publicKey } = uBoot.generateEd25519Keypair(
      uBoot.generateSeed(uBoot.generateMnemonic()),
    );
    assert.isString(privateKey.toString('hex'));
    assert.isString(publicKey.toString('hex'));
  });
  it('cannot recover seed - wrong mnemonic', () => {});

  it('cannot sign message - wrong keypair', () => {});

  it('uses a mnemonic as a key to generate a seed', () => {
    //    const mnemonic = uBoot.generateMnemonic();
    const oldMnemonic =
      'govern join crop mistake dry point execute famous kit method hedgehog hold meat critic section gauge menu famous journey frog addict powder dentist trip';

    const { privateKey, publicKey } =
      uBoot.ed25519KeypairFromMnemonic(oldMnemonic); // uBoot.generateSeed(mnemonic);
    // const oldSeed =
    //   '6a2b64b02506f4f6138fd819d0282c800eacd6dc809505f6cb00462a618b307cc0043993a21299ed7fe9342c57a06b82f80d2f301bd7b0f87a6bc9953012af96';
    console.log(privateKey.toString('hex'));
    console.log(publicKey.toString('hex'));
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

