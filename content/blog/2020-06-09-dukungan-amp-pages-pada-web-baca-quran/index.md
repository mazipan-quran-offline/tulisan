---
title: Dukungan AMP Pages pada Baca-Quran.id
description: Mempercepat waktu muat untuk pengunjung pertama web Baca-Quran.id dengan mengoptimalkan penggunaan AMP Pages
date: "2020-06-09T23:59:59.121Z"
---

Web [Baca-Quran.id](https://www.baca-quran.id/) memang mengedepankan pengalaman yang mirip aplikasi Native.
Banyak fitur-fitur yang disematkan mengikuti dari fitur yang tersedia di aplikasi Native biasanya.
Hal ini karena memang sebagaian besar dari kita lebih nyaman ketika menggunakan aplikasi Native dibandingkan mengakses Web.

Untuk mengakomodir kebutuhan ini, Baca-Quran.id membutuhkan dukungan terbaru dari browser.
Menyimpan data-data statis pada memory browser sehingga bisa diakses lebih cepat pada kunjungan kedua kalinya.

Salah satu yang diutamakan adalah perpindahan antara satu halaman menuju halaman lain yang terasa cepat apabila sudah pernah dikunjungi.
Hal ini bisa dicapai karena Web Baca-Quran.id banyak menggunakan sumber daya JavaScript statis yang mudah disimpan di memory dibandingkan mengirimkan full HTML setiap kali request.

Sayangnya cara ini menimbulkan permasalahan lain yakni waktu muat pada kunjungan pertama kali sangat lambat.
Ini tentu bukan hal yang diinginkan oleh saya maupun pengguna.

Padahal pengguna aktif web Baca-Quran.id belum banyak dan masih bisa dihitung jari.
Artinya ada kemungkinan besar sebagian pengunjung adalah pengunjung untuk pertama kalinya.
Termasuk orang-orang yang datang setelah menemukan web ini lewat mesin pencari seperti Google Search.

Waktu muat yang lama bisa menyebabkan mereka kapok dan tidak mau menggunakan aplikasi ini lebih jauh lagi.
Padahal pengalaman untuk pengguna dengan kunjungan rutin sangatlah baik.

Untuk mengatasi hal ini, saya mencoba mengadopsi salah satu teknologi yang diinisiasi oleh Google bernama [AMP](https://amp.dev/)
Pada dasarnya ini adalah versi cepat dari web utama.
Meskipun bisa diakses mandiri, sebenarnya peruntukannya adalah untuk pengunjung pertama yang datang dari hasil pencarian di Google Search.
Jadi orang yang meng-klik hasil pencarian akan mendapatkan hasil yang cepat.

Berikut salah satu tangkaoan layar dari hasil pencarian di device Android:

![AMP Baca-Quran.id](amp-baca-quran.jpg]

Hasil pencarian yang memiliki logo petir ⚡ disamping nama webnya adalah halaman yang mendukung AMP.
Saat ini hanya untuk pencarian di device handphone saja dengan dukungan browser yang terbaru.

Namun begitu, teman-teman yang ingin merasakan pengalaman menggunakan web versi AMP ini bisa mengunjungi tautan dengan awalan `/amp`, misalnya:

- [Daftar surat versi AMP](https://www.baca-quran.id/amp/all-surah/)
- [Surat Al Fatihah versi AMP](https://www.baca-quran.id/amp/1/)
- [Surat An Nas versi AMP](https://www.baca-quran.id/amp/114/)
- Dan lain-lain

Perlu diketahui, versi AMP memiliki fitur yang dipangkas agar mencapai kecepatan muat yang signifikan berbeda dari versi aslinya.
Jadi perlu dimaklumi kalau ada fitur yang tidak tersedia dalam versi AMP ini.

Terima kasih,

Semoga bermanfaat!
