# AGENTS.md

Panduan untuk menulis artikel baru di repositori ini. Repositori `tulisan` adalah blog (dibangun dengan Gatsby) yang berfungsi sebagai pendukung SEO untuk proyek utama [Baca-Quran.id](https://www.baca-quran.id/). Tujuan utama setiap artikel adalah membantu pembaca sekaligus mengarahkan trafik menuju domain utama.

## Lokasi dan Struktur Artikel

- Semua artikel berada di `content/blog/`.
- Setiap artikel memiliki foldernya sendiri dengan format nama: `YYYY-MM-DD-judul-slug/`.
- File konten utama selalu bernama `index.md` di dalam folder tersebut.
- Slug URL diturunkan otomatis dari nama folder, sehingga URL akhirnya menjadi `https://www.baca-quran.id/tulisan/{nama-folder}/`.
- Gambar diletakkan di dalam folder artikel yang sama dan dirujuk dengan nama file relatif, contohnya `![Keterangan](nama-gambar.jpg)`.

## Frontmatter

Setiap `index.md` diawali dengan frontmatter berikut:

```
---
title: Judul Artikel
description: Deskripsi singkat yang ramah SEO, idealnya memuat kata kunci utama.
date: '2026-05-28T10:00:00.000Z'
---
```

- `title`, `description`, dan `date` adalah tiga field yang dipakai.
- Gunakan format tanggal ISO. Bila menerbitkan beberapa artikel pada hari yang sama, bedakan jamnya agar urutannya rapi.

## Gaya Penulisan

- Tulis dalam Bahasa Indonesia dengan nada formal namun tetap ramah dan terasa manusiawi, tidak kaku.
- **Jangan pernah menggunakan tanda pemisah "--" atau tanda pisah panjang (em dash).** Gunakan koma untuk menggantikannya agar kalimat terasa lebih alami.
- Sapa pembaca dengan "Anda".
- Buat tulisan mudah dipindai di layar ponsel, sebab mayoritas pembaca mengakses dari perangkat seluler. Manfaatkan judul bagian (heading), poin, dan tabel.

## Tautan ke Proyek Utama (Wajib)

- Setiap artikel **wajib memuat minimal satu atau dua tautan** yang mengarah ke proyek utama di `https://www.baca-quran.id/`.
- Contoh tautan yang bisa digunakan:
  - Halaman beranda: `https://www.baca-quran.id/`
  - Surat dan ayat: `https://www.baca-quran.id/surah/{nomor-surat}/{nomor-ayat}/`
  - Juz Amma: `https://www.baca-quran.id/juz-amma/`
  - Tasbih digital: `https://www.baca-quran.id/tasbih/`
- Ketika menyebut sebuah ayat, tautkan langsung ke halaman ayatnya di Baca-Quran.id.

## Tautan Antar Artikel

- Untuk menautkan ke artikel lain di blog ini, gunakan path slug relatif, contohnya `[Judul](/2023-05-01-10-ayat-tentang-kebahagiaan/)`.
- Saling tautkan artikel yang temanya berkaitan agar pembaca betah menjelajah dan struktur internal lebih kuat.

## Catatan SEO

- Pilih topik berdasarkan data nyata (Google Search Console), bukan sekadar perkiraan.
- Untuk pertanyaan yang sering dicari, sediakan bagian tanya jawab dengan kalimat yang persis seperti cara orang mengetik di pencarian, agar berpeluang memenangkan featured snippet.
- Hindari membuat artikel yang topiknya sudah ada untuk mencegah saling memakan kata kunci (keyword cannibalization).
- Rencana konten dan daftar peluang artikel didokumentasikan pada issue tracker repositori ini.

## Konten Terjadwal (Artikel Musiman)

Untuk artikel musiman yang harus terbit pada tanggal tertentu (misalnya konten terkait Idul Adha, Tahun Baru Islam, atau puasa Asyura), gunakan alur penerbitan terjadwal berikut. Alur ini dijalankan oleh workflow `.github/workflows/scheduled-merge.yml` dan bot merge Kodiak.

**Cara membuat konten terjadwal:**

1. Tulis artikel seperti biasa di `content/blog/`. Sebaiknya samakan nilai `date` pada frontmatter dengan tanggal terbit yang diinginkan, dan gunakan tanggal tersebut pula sebagai awalan nama folder.
2. Buat satu Pull Request terpisah untuk setiap artikel terjadwal, agar tiap artikel bisa terbit pada tanggalnya masing-masing.
3. Cantumkan token tanggal pada **judul PR** dengan format `[publish: YYYY-MM-DD]`, contohnya:
   `[publish: 2026-06-16] CONTENT: Amalan dan Keutamaan Bulan Muharram`
4. Biarkan PR tetap terbuka. Token pada judul inilah yang menjadi penanda jadwal sekaligus sumber tanggal terbitnya.

**Cara kerja otomatisasinya:**

- Workflow `scheduled-merge.yml` berjalan dua kali sehari (serta bisa dijalankan manual lewat `workflow_dispatch`).
- Tanggal dibandingkan dengan waktu WIB (UTC+7). Ketika tanggal hari ini sudah mencapai tanggal pada token, workflow akan menghapus token `[publish: ...]` dari judul PR lalu menambahkan label `automerge`.
- Kodiak kemudian me-merge PR tersebut setelah pemeriksaan (PR check) lolos, dan push ke `master` memicu workflow `Deploy` ke GitHub Pages.
- Catatan: penjadwalan cron GitHub akurat pada level tanggal, bukan menit, sehingga waktu terbit pasti tepat di tanggalnya namun bukan pada jam yang presisi.

**Penting:** jangan menambahkan label `automerge` secara manual pada PR terjadwal kecuali memang ingin segera menerbitkannya, sebab label itulah yang menjadi pemicu merge oleh Kodiak.

## Contoh Referensi

Beberapa artikel yang bisa dijadikan acuan format:

- Format daftar ayat: `content/blog/2023-05-01-10-ayat-tentang-kebahagiaan/`
- Format tabel dan tanya jawab: `content/blog/2026-05-28-urutan-surat-juz-30-sebelum-dan-sesudahnya/`
- Format panduan dengan gambar: `content/blog/2024-12-06-panduan-menggunakan-tasbih-digital-online/`
