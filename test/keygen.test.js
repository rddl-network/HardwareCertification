const { assert } = require('chai');

const uBoot = require('../src/u_boot.js');

describe('Runs through cryptography steps', () => {
  it('cannot generate mnemonic - invalid entropy', () => {
    assert.deepEqual(uBoot.generateMnemonic(384), 1);
  });
  it('generates mnemonic', () => {
    assert.isString(uBoot.generateMnemonic(256));
  });
  it('cannot generate seed - invalid mnemonic', () => {
    assert.deepEqual(uBoot.generateSeed('abcd'), 1);
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
  it('cannot recover seed - wrong mnemonic', () => {
    const mnemonic1 = uBoot.generateMnemonic();
    const seed1 = uBoot.generateSeed(mnemonic1);
    const mnemonic2 = uBoot.generateMnemonic();
    assert.notDeepEqual(seed1, uBoot.generateSeed(mnemonic2));
  });
  it('recovers seed', () => {
    const mnemonic1 = uBoot.generateMnemonic();
    const seed1 = uBoot.generateSeed(mnemonic1);
    assert.deepEqual(seed1, uBoot.generateSeed(mnemonic1));
  });
  it('cannot recover keypair - wrong mnemonic', () => {
    const mnemonic1 = uBoot.generateMnemonic();
    const keypair1 = uBoot.ed25519KeypairFromMnemonic(mnemonic1);
    const mnemonic2 = uBoot.generateMnemonic();
    const keypair2 = uBoot.ed25519KeypairFromMnemonic(mnemonic2);
    assert.notDeepEqual(
      keypair1.privateKey.toString('hex'),
      keypair2.privateKey.toString('hex'),
    );
    assert.notDeepEqual(
      keypair1.publicKey.toString('hex'),
      keypair2.publicKey.toString('hex'),
    );
  });
  it('recovers keypair', () => {
    const mnemonic1 = uBoot.generateMnemonic();
    const keypair1 = uBoot.ed25519KeypairFromMnemonic(mnemonic1);
    const keypair2 = uBoot.ed25519KeypairFromMnemonic(mnemonic1);
    assert.deepEqual(
      keypair1.privateKey.toString('hex'),
      keypair2.privateKey.toString('hex'),
    );
    assert.deepEqual(
      keypair1.publicKey.toString('hex'),
      keypair2.publicKey.toString('hex'),
    );
  });
  it('cannot verify messages - wrong keypair', () => {
    const keypairProvisioned = uBoot.ed25519KeypairFromMnemonic(
      uBoot.generateMnemonic(),
    );
    const keypairGenerated = uBoot.ed25519KeypairFromMnemonic(
      uBoot.generateMnemonic(),
    );
    const keypairFalse = uBoot.ed25519KeypairFromMnemonic(
      uBoot.generateMnemonic(),
    );
    const signedProvisioned = uBoot.signMessage(
      keypairProvisioned.publicKey,
      keypairGenerated.privateKey,
    );
    const signedGenerated = uBoot.signMessage(
      keypairGenerated.publicKey,
      keypairProvisioned.privateKey,
    );
    const verifyHasProvisioned = uBoot.verifyMessage(
      keypairProvisioned.publicKey,
      signedProvisioned,
      keypairFalse.publicKey,
    );
    const verifyHasNewId = uBoot.verifyMessage(
      keypairGenerated.publicKey,
      signedGenerated,
      keypairFalse.publicKey,
    );
    assert.isFalse(verifyHasProvisioned);
    assert.isFalse(verifyHasNewId);
  });
  it('verifies messages', () => {
    const keypairProvisioned = uBoot.ed25519KeypairFromMnemonic(
      uBoot.generateMnemonic(),
    );
    const keypairGenerated = uBoot.ed25519KeypairFromMnemonic(
      uBoot.generateMnemonic(),
    );
    const signedProvisioned = uBoot.signMessage(
      keypairProvisioned.publicKey,
      keypairGenerated.privateKey,
    );
    const signedGenerated = uBoot.signMessage(
      keypairGenerated.publicKey,
      keypairProvisioned.privateKey,
    );
    const verifyHasProvisioned = uBoot.verifyMessage(
      keypairProvisioned.publicKey,
      signedProvisioned,
      keypairGenerated.publicKey,
    );
    const verifyHasNewId = uBoot.verifyMessage(
      keypairGenerated.publicKey,
      signedGenerated,
      keypairProvisioned.publicKey,
    );
    assert.isTrue(verifyHasProvisioned);
    assert.isTrue(verifyHasNewId);
  });
});

