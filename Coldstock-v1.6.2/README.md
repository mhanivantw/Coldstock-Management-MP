# Coldstock v1.6.2

Patch untuk aplikasi v1.6.1 yang sudah dipakai SK. Expansion role v2.0 tidak diaktifkan.

Baca **UPDATE-V162.md** untuk perubahan, pemasangan, penggunaan koreksi, dan rekonsiliasi khusus palet104.

## File untuk Apps Script

- Code.gs: backend dan aturan stok.
- Index.html: salin seluruh isi ke file HTML bernama Index di Apps Script.
- appsscript.json: konfigurasi Google Sheets API dan runtime V8; pertahankan pengaturan proyek yang sudah benar.

SYNC semua HP terlebih dahulu. Ganti Code.gs dan Index, simpan, lalu Deploy → Manage deployments → Edit → New version. Jangan menjalankan ulang setupDatabase atau menghapus sheet transaksi.

## Koreksi

Buka detail barang → Koreksi data → pilih item → isi nilai benar dan alasan → Tinjau perubahan → Konfirmasi koreksi → SYNC.

Ekspor KOREKSI dipaste ke sheet KOREKSI workbook v1.6.2. Ekspor IN/OUT tetap terpisah. Jangan paste ulang ID transaksi yang sama.

## Pengembangan

Sumber ada di src. Jalankan node build.cjs dari folder ini untuk membangun Index.html dan Code.gs. CSS yang sudah dibangun disertakan, tanpa dependensi runtime tambahan. Jalankan npm test untuk pengujian logika dan simulasi backend/offline.

Tidak ada deployment Google Apps Script otomatis dalam paket ini.
