---
title: Gunakan font Isep Mishab dari LPMQ untuk Al-Qur'an Indonesia
description: Membicarakan aplikasi Quran di Indonesia yang seharusnya menggunakan font dengan standard yang sama
date: "2020-06-06T23:59:59.121Z"
---

Aplikasi Quran ada sangat banyak bertebaran di pasaran, baik yang versi aplikasi maupun versi web, dari yang versi gratis sampai yang berbayar. Yang gratisan biasanya ya memiliki fitur seadanya sedangkan yang berbayar biasanya memiliki fitur yang lebih komplit, tapi tidak membatasi juga harus menggunakan versi yang berbayar. Cari saja yang nyaman dibaca oleh masing-masing dari kalian.

Salah satu kesulitan yang ditemui ketika mengembangkan aplikasi Al-Qur'an adalah menentukan jenis font yang harus digunakan, terutama di Indonesia, karena memang di Indonesia memiliki font yang sedikit berbeda dengan yang digunakan orang-orang di luar Indonesia.
Pilihan terbaik adalah menggunakan font yang telah dikembangkan oleh Lajnah Pentashihan Mushaf Alquran (LPMQ), lembaga yang sama yang mengembangkan halaman [Quran Kemenag](https://quran.kemenag.go.id/#!).
Font ini disebut Font LPMQ Isep Mishbah, nama Isep Misbah sendiri diambil dari nama kaligrafer yang menulis tangan versi cetak yang dikembangkan dan dipantau oleh LPMQ yakni Isep Misbah MA.
Versi cetaknya sendiri ditulis hanya ditulis oleh Isep Misbah seorang, hal ini untuk memastikan konsistensi dari tulisan yang dihasilkan. Tentu saja tetap di pantau dan diawasi oleh LPMQ semua hasil tangan yang ditulis.
Font ini juga tentu memiliki khasnya tersendiri dibandingkan font yang sudah ada di luar sana. Ini karena sebagian besar font yang tersedia merupakan modifikasi dari font lain yang kebanyakan berasal dari luar negeri.

## Unduh Font LPMP Isep Mishah

Font LPMP Isep Misbah bisa teman-teman dapatkan secara gratis di halaman [website kemenag](https://quran.kemenag.go.id/) kemudian klik tautan Font Standard, setelahnya akan diminta mengisi beberapa data. 
Temen-temen juga bisa menemukan Font Isep Misbah dari kode sumber aplikasi [Baca-Quran.id](https://www.baca-quran.id/) yang memang tersedia bebas untuk dipelajari.
Silahkan klik tautan [quran-offline/tree/master/static/fonts](https://github.com/mazipan/quran-offline/tree/master/static/fonts) untuk mengunduh Font yang sudah saya unduh lebih dulu.

Aplikasi web [Baca-Quran.id](https://www.baca-quran.id/1/) ini saat ini telah menggunakan font yang sama dengan yang digunakan oleh Quran Kemenag, hal ini diharapkan agar web ini lebih mudah dibaca oleh temen-temen di Indonesia.
Saya pribadi sebagai pengguna juga merasa font ini memang nyaman dan cocok dengan font ini, tulisan yang dihasilkan bisa lumayan mirip dengan mushaf yang saya pelajari dari kecil.
Dengan menyetel ukuran font lebih besar maka huruf menjadi lebih mudah dibaca lagi.

## Menggunakan di Web

Untuk menggunakan font ini di sebuah Web, bisa lewat CSS yang mendefinisikan custom font yang akan kita gunakan, berikut contoh kodenya:

```css
@font-face {
  font-family: "lpmq";
  src: url(/alamat_font/lpmq.otf) format("opentype");
  font-display: swap;
}

```

Kemudian custom font ini bisa digunakan di tempat lain, seperti:

```css
.font-arabic{
  font-family: "lpmq", Arial, sans-serif;
  line-height: 2;
}
```

Tinggal pada kode HTML ditambahkan class tersebut.

---

Demikian sekelumit mengenai Font LPMQ Isep Misbah.

Terima kasih,

Semoga bermanfaat!
