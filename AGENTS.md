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
- **Jika nilai `title` atau `description` mengandung tanda titik dua (`:`) atau karakter YAML khusus lainnya, wajib dibungkus dengan tanda kutip ganda.** Nilai tanpa kutip yang mengandung `: ` akan dianggap sebagai pasangan key-value oleh parser YAML dan menyebabkan build gagal. Contoh yang benar: `title: "Panduan Tajwid: Belajar Membaca Al-Quran"`. Contoh yang salah: `title: Panduan Tajwid: Belajar Membaca Al-Quran`.

## Aturan Tanggal Terbit

Nilai `date` pada frontmatter sangat penting karena situs ini menampilkan seluruh artikel tanpa memandang tanggalnya, lalu mengurutkannya dari yang terbaru. Jadi tanggal menentukan urutan tampilan sekaligus kapan artikel dianggap terbit. Ikuti aturan berikut.

- **Jangan menumpuk banyak artikel pada satu tanggal yang sama.** Saat menerbitkan beberapa artikel sekaligus (bulk), beri jarak sekitar 2 hingga 3 hari antar artikel agar penerbitan terlihat bertahap dan lebih alami, bukan seperti unggahan massal dalam sehari.
- **Hindari tanggal di masa depan untuk artikel biasa.** Karena proses build menampilkan semua artikel termasuk yang bertanggal masa depan, gunakan tanggal paling lambat hari ini. Bila perlu memberi jarak, mundurkan tanggalnya (ke masa lalu), jangan majukan, supaya tidak ada artikel yang tampil dengan tanggal yang belum tiba.
- **Untuk artikel musiman atau yang terikat tanggal acara,** jadwalkan penerbitannya 1 hingga 2 minggu sebelum tanggal acara, bukan tepat di hari H. Lead time ini memberi mesin pencari waktu untuk mengindeks artikel sebelum lonjakan trafik. Gunakan alur "Konten Terjadwal" di bawah agar artikel otomatis terbit pada tanggalnya (di sinilah tanggal masa depan justru diperbolehkan, karena PR baru di-merge saat tanggalnya tiba).

## Gaya Penulisan

- Tulis dalam Bahasa Indonesia dengan nada hangat dan terasa manusiawi, seperti seseorang yang benar-benar peduli dan ingin berbagi, bukan seperti ringkasan ensiklopedia.
- **Jangan pernah menggunakan tanda pemisah "--" atau tanda pisah panjang (em dash).** Gunakan koma untuk menggantikannya agar kalimat terasa lebih alami.
- Sapa pembaca dengan "Anda".
- Buat tulisan mudah dipindai di layar ponsel, sebab mayoritas pembaca mengakses dari perangkat seluler. Manfaatkan judul bagian (heading) dan tabel bila sesuai.

### Panjang dan Kedalaman Konten

- **Setiap bagian (section) harus berisi minimal 4 hingga 6 kalimat**, bukan 1 atau 2. Jelaskan mengapa sesuatu itu penting, berikan konteks historis atau spiritual, dan hubungkan dengan kehidupan nyata pembaca.
- **Hindari paragraf yang terlalu pendek dan terasa seperti poin ringkasan.** Tulis dengan kalimat penuh yang mengalir, bukan daftar fakta yang terputus-putus.
- Target panjang artikel minimal sekitar **700 hingga 900 kata** agar konten cukup dalam untuk memberikan manfaat nyata.

### Cara Menuliskan Sub-topik

- **Gunakan format bold-headed paragraph** untuk sub-topik dalam sebuah section, bukan bullet list mentah. Caranya: tulis nama sub-topik dicetak tebal di awal paragraf, lalu langsung lanjutkan penjelasannya dalam kalimat yang mengalir di paragraf yang sama.
  - Contoh yang benar: `**Menjaga Sahur** — Sahur bukan sekadar kebiasaan...`
  - Contoh yang salah: `- Menjaga Sahur: penting karena mengandung berkah.`
- Pengecualian: tabel dan daftar langkah prosedural yang memang paling jelas dalam format berurutan tetap boleh menggunakan format list.

### Pembuka Artikel

- **Jangan memulai artikel dengan kalimat template** seperti "Artikel ini membahas...", "Artikel ini merangkum...", atau "Artikel ini menjelaskan...". Kalimat tersebut terasa seperti AI dan membuang perhatian pembaca.
- Buka dengan kalimat yang langsung menempatkan pembaca dalam konteks: jelaskan mengapa topik ini relevan, apa yang membuat momen ini istimewa, atau tegangan/pertanyaan yang akan dijawab artikel.

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
2. Jadwalkan penerbitan 1 hingga 2 minggu sebelum tanggal acara, bukan tepat di hari H. Hal ini memberi mesin pencari waktu untuk mengindeks artikel sebelum lonjakan trafik, sekaligus memberi kelonggaran terhadap jeda penjadwalan.
3. Buat satu Pull Request terpisah untuk setiap artikel terjadwal, agar tiap artikel bisa terbit pada tanggalnya masing-masing.
4. Cantumkan token tanggal pada **judul PR** dengan format `[publish: YYYY-MM-DD]`, contohnya:
   `[publish: 2026-06-05] CONTENT: Amalan dan Keutamaan Bulan Muharram`
5. Tambahkan label **`scheduled`** pada PR tersebut untuk memudahkan identifikasi dan pengelompokan konten terjadwal.
6. Biarkan PR tetap terbuka. Token pada judul inilah yang menjadi penanda jadwal sekaligus sumber tanggal terbitnya.

**Cara kerja otomatisasinya:**

- Workflow `scheduled-merge.yml` berjalan setiap dua hari sekali (serta bisa dijalankan manual lewat `workflow_dispatch`).
- Tanggal dibandingkan dengan waktu WIB (UTC+7). Ketika tanggal hari ini sudah mencapai tanggal pada token, workflow akan menghapus token `[publish: ...]` dari judul PR lalu menambahkan label `automerge`.
- Kodiak kemudian me-merge PR tersebut setelah pemeriksaan (PR check) lolos, dan push ke `master` memicu workflow `Deploy` ke GitHub Pages.
- Catatan: karena workflow berjalan setiap dua hari sekali dan cron GitHub bisa sedikit terlambat, penerbitan akurat pada level tanggal (bukan jam) dan bisa meleset satu hingga dua hari. Karena itulah artikel dijadwalkan jauh-jauh hari sebelum acara.

**Penting:** jangan menambahkan label `automerge` secara manual pada PR terjadwal kecuali memang ingin segera menerbitkannya, sebab label itulah yang menjadi pemicu merge oleh Kodiak.

## Alur Kerja PR (Pull Request)

- Setiap pekerjaan selalu dikerjakan di **branch baru yang dibuat dari `master` terbaru**, bukan melanjutkan branch lama.
- Gunakan satu branch per PR. Jangan menambahkan commit baru ke branch yang PRnya sudah dibuka.
- **Setiap kali pengguna mengatakan "I merged it" (atau sejenisnya), langsung buat branch baru dan PR baru** untuk pekerjaan berikutnya. Jangan menunggu instruksi tambahan.
- Alur baku: `git checkout origin/master -b nama-branch` → kerjakan perubahan → commit → push → buka PR.

## Contoh Referensi

Beberapa artikel yang bisa dijadikan acuan format dan gaya penulisan:

- Gaya narasi hangat dengan section panjang: `content/blog/2023-08-05-mengapa-al-quran-dijuluki-sebagai-pedoman-hidup-umat-muslim/`
- Format bold-headed paragraph untuk sub-topik: `content/blog/2026-06-05-amalan-dan-keutamaan-bulan-muharram/`
- Artikel panduan dengan niat Arab + penjelasan kontekstual: `content/blog/2026-06-11-panduan-puasa-tasua-dan-asyura/`
- Format daftar ayat dengan komentar mendalam per ayat: `content/blog/2026-05-28-ayat-al-quran-tentang-kebahagiaan-dunia-dan-akhirat/`
- Format tabel dan tanya jawab: `content/blog/2026-05-28-urutan-surat-juz-30-sebelum-dan-sesudahnya/`
- Format panduan dengan gambar: `content/blog/2024-12-06-panduan-menggunakan-tasbih-digital-online/`
