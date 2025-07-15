import Client from 'mina-signer';
const minaSigner = new Client({ network: 'testnet' });
const keys = minaSigner.genKeys();
console.log('Private Key:', keys.privateKey);