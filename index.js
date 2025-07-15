import { ZkDatabase } from 'zkdb';
import Client from 'mina-signer';
const minaSigner = new Client({ network: 'testnet' });

async function main() {
  const privateKey = 'EKEyc6FE83ieTM35T64hMrSjyM2Z228zgdpfXrC6vJJFbnsVcgEz';
  const userName = 'test-user';
  const email = 'test@example.com';

  // Koneksi ke zkDatabase
  const zkdb = await ZkDatabase.connect({
    userName: userName,
    privateKey: privateKey,
    environment: 'node',
    url: 'https://api.zkdatabase.org/graphql',
  });

  // Sign-up atau sign-in
  if (!(await zkdb.auth.isUserExist(userName))) {
    console.log('Mendaftarkan pengguna baru...');
    await zkdb.auth.signUp(email);
    console.log(`Pengguna ${userName} berhasil didaftarkan dengan email ${email}`);
  } else {
    console.log('Pengguna sudah terdaftar, melakukan sign-in...');
    await zkdb.auth.signIn();
  }

  // Buat dokumen
  const note = {
    title: 'Catatan Pertama',
    content: 'Ini adalah percobaan sederhana menggunakan zkDatabase!',
  };

  try {
    await zkdb.createDocument('notes', note);
    console.log('Dokumen berhasil disimpan:', note);
  } catch (error) {
    console.error('Gagal menyimpan dokumen:', error);
  }

  // Putuskan koneksi
  await zkdb.disconnect();
  console.log('Koneksi ke zkDatabase ditutup.');
}

main().catch((error) => {
  console.error('Error:', error);
});