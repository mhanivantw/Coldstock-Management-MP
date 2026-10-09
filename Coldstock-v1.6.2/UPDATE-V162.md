# Coldstock v1.6.2 — koreksi data dan kartu stok

## Perubahan

- Detail barang memiliki tombol **Koreksi data**. Pilih item, ubah SKU, KP, QTY tersisa, nomor pallet, SPV, atau catatan, isi alasan, lalu tinjau sebelum/sesudah dan konfirmasi.
- Data awal, data sesudah, selisih jumlah, operator, waktu, dan alasan disimpan di Transaction_Log. Koreksi tidak menjadi IN/OUT baru. Penyimpanan HP dan SYNC tetap dipakai.
- Field identitas/jumlah item lama dikunci pada editor biasa. Barang baru menggunakan **Tambah item**, meskipun nomor pallet sama. Status QC tetap dapat diperbarui pada editor biasa.
- Ekspor memiliki tab **KOREKSI** (25 kolom). IN tetap 14 kolom, OUT 18 kolom.
- Excel memiliki sheet KOREKSI. Dashboard menampilkan seluruh daftar, sampai 1.000 identitas dari 500 baris IN + 500 baris OUT. Produk dan KP tetap dapat difilter. Header dibekukan.
- Saldo = IN + Koreksi CTN − OUT. Kolom Koreksi CTN di sisi kanan Dashboard; catatan IN mentah tetap tersedia.
- Riwayat trial item `e8113d62-4f51-46f3-bb65-c70b1a9a5afe` dilaporkan terpisah sebagai CCN16 dan PCN14, sesuai konfirmasi pengguna. Total tetap30. ID laporan diberi suffix SKU yang stabil dan sama pada ekspor IN/OUT.

## Update aplikasi

1. Selesaikan SYNC semua HP dengan deployment lama terlebih dahulu. Simpan cadangan Google Sheets.
2. Ganti seluruh isi **Code.gs** dan **Index** dengan Code.gs dan Index.html dari folder v1.6.2 ini. Tidak perlu menjalankan setupDatabase lagi.
3. Save → Deploy → Manage deployments → Edit → **New version** → Deploy.
4. Buka ulang URL app di semua HP, kemudian **Muat ulang**. Semua perangkat perlu memakai versi yang sama.
5. Kolom audit tambahan pada Transaction_Log dibuat otomatis saat digunakan. Jangan menghapus header atau data lama.

## Update Excel

Gunakan workbook v1.6.2 yang sudah berisi data trial terbaru. File asal tidak ditimpa. Font dan layout lama dipertahankan.

- Paste nilai tanpa header pada tabel sesuai jenisnya: INPUT_IN, INPUT_OUT, atau KOREKSI. Data mulai A4; lanjutkan di baris kosong. Kapasitas masing-masing 500 baris.
- Jangan paste ulang ID Trans yang sudah ada. Koreksi diekspor tersendiri sehingga tidak perlu menambah ulang baris IN lama.
- Setelah memakai sheet KOREKSI, jangan sekaligus mengurangi QTY pada INPUT_IN untuk koreksi yang sama; itu akan menghitung pengurangan dua kali.
- Kalau mengganti seluruh data dari ekspor seluruh periode, **Clear Contents isi data** dahulu; jangan Delete Rows dan jangan hapus formula/helper.
- QTY koreksi adalah perubahan stok tersisa. Contoh: IN30, OUT10, koreksi stok tersisa20→15 menghasilkan koreksi−5 dan saldo15.
- Identitas terbaru dibaca dari KOREKSI berdasarkan Urutan ekspor. Urutan tidak boleh diubah manual. Dashboard dan HOLD mengikuti metadata koreksi; IN mentah tetap menjadi bukti awal.
- Kolom QC manual di HOLD tetap digunakan seperti sebelumnya. Entri QC lama yang tidak ada lagi di data IN tetap dipertahankan dan diberi pesan; jangan menganggapnya keputusan untuk item lain.

## Pengaman dan batas

- QTY koreksi 1–1.000.000 CTN, bilangan bulat. Penghapusan penerimaan penuh menjadi0 belum termasuk patch ini.
- QTY tidak boleh lebih rendah dari jumlah yang masih dicadangkan picking. Edit/batalkan draft terkait dahulu.
- SKU/KP/pallet/SPV barang dalam picking harus dilepas dari draft dahulu.
- Identitas barang yang sudah dipakai SJ tidak dapat diganti langsung. Perlu rekonsiliasi admin. Koreksi QTY tersisa/catatan masih bisa; SJ lama tidak ditulis ulang.
- Identitas komponen pallet gabungan tidak dapat diubah langsung. QTY, SPV, dan catatan dapat dikoreksi dengan pengaman yang sama.
- Penerimaan lama dengan ID ganda selain tiga pasangan yang sudah dikonfirmasi tidak ditebak: ekspor meminta rekonsiliasi.

## Rekonsiliasi stok aktif palet104 (hanya bila masih relevan)

Pemisahan di Excel/ekspor tidak otomatis mengubah stok aktif yang terlanjur gabung di app.

1. Pastikan antrean semua HP kosong dan hentikan input sebentar.
2. Di editor Apps Script, jalankan `previewRepairPallet104_` dan lihat execution log.
3. Jalankan `repairPallet104_` hanya jika pratinjau sesuai kondisi nyata: CCN16 + PCN14 pada palet104.
4. Semua HP klik **Muat ulang** setelah selesai.

Fungsi hanya menerima dua riwayat IN asli yang cocok, stok aktif30, tanpa pallet gabungan, tanpa picking/SJ aktif, dan tanpa koreksi/OUT. Bila kondisi berbeda, fungsi berhenti. Proses menambah audit REPAIR serta memisahkan ID stok dalam satu batch, tanpa membuat penerimaan baru atau mengubah bukti IN/SJ lama. Menjalankan ulang setelah berhasil tidak menggandakan item.

### Dua pasangan tambahan yang sudah dikonfirmasi

- CCN10 PP79 + CCN STICK20 PP76: pratinjau `previewRepairPallet79And76_`, kemudian `repairPallet79And76_` jika cocok.
- CCN15 PP3 + CCN STICK15 PP97: pratinjau `previewRepairPallet3And97_`, kemudian `repairPallet3And97_` jika cocok.

Keduanya KP28 September2026, status Release pada penerimaan. Pengaman sama seperti palet104. Jalankan hanya kasus yang stok aktifnya masih sesuai. File Excel sudah memisahkan ketiga pasangan tanpa menambah/mengurangi total IN4276 CTN.

Pengujian rumus dilakukan melalui mesin spreadsheet, bukan aplikasi Microsoft Excel native. Setelah dibuka, Excel menghitung ulang otomatis; pastikan Calculation Options = Automatic.
