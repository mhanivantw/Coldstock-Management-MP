// Helper sementara untuk dijalankan dari editor Apps Script.
// Hapus file Setup setelah database siap, sebelum deploy Web App.
function setupDatabase() {
  const hasil = setupDatabase_();
  console.log(hasil);
  return hasil;
}
