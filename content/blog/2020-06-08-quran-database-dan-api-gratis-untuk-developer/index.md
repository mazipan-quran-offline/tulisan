---
title: Quran Database dan Rest API gratis untuk developer
description: Beberapa Quran database dan Rest API yang bisa digunakan oleh para developer untuk mengembangkan Aplikasi Quran
date: '2024-12-01T23:59:59.121Z'
---

Mengembangkan aplikasi Quran tentu membutuhkan data Quran.
Mendapatkan data yang tepat akan menjadi penentu apakah proses pengembangan aplikasi bisa berjalan mudah atau malah berjalan rumit.

Berikut beberapa Quran Database dan Rest API yang bisa digunakan oleh para temen-temen developer dalam mengembangkan aplikasi Quran sendiri:

## [Quran.com](https://quran.api-docs.io/v3/)

Rest API dari Quran.com ini memiliki data yang cukup lengkap meskipun belum tersedia terjemahan dalam Bahasa Indonesia.
Jika teman-teman ingin mengembangkan aplikasi Quran dengan sasaran pengguna Internasional, API ini sangat cocok untuk dicoba.

Keunggulan lain yang bisa didapatkan dengan memilih Rest API ini adalah web dokumentasi yang enak buat dipahami sehingga mudah bagi kita untuk memahami struktur datanya.

## [Quran.Cloud](https://alquran.cloud/)

Dokumentasi Rest API mereka terletak di halaman [alquran.cloud/api](https://alquran.cloud/api)
Data yang disediakan juga salah satu yang terbaik menurut saya pribadi.
Lengkap dengan berbagai variasinya.
Sudah tersedia data audionya juga.
Endpoint yang disediakan cukup banyak, bisa menggunakan offset dan terdapat beberapa pilihan jenis khat.

## [QuranDatabase.org](http://www.qurandatabase.org/)

Website ini menyediakan data Quran dalam berbagai format dari mulai CSV, Ms. Excel, MySQL, XML bahkan plain text.
Jika kalian berencana menyimpan sendiri data Quran, mungkin ini bisa menjadi sumber data yang bisa kalian gunakan.

## [QuranJson](https://github.com/rioastamal/quran-json)

Projek ini menyediakan data Quran dalam bentuk berkas JSON statis.
Datanya adalah hasil scrapping dari website Kemenag, jadi data terjemahan dan tafsir yang disediakan hanya data dalam Bahasa Indonesia.
Jika kalian mentargetkan pengguna khusus orang Indonesia saja, data dari projek ini bisa kalian gunakan.

Aplikasi [Baca-Quran.id](https://www.baca-quran.id) juga memanfaatkan data yabg disediakan di repository ini.
Menggunakan fitur gitsubmodule sehingga selalu tertaut dengan perubahan terbaru dari repository utamanya.

## [BangHasan.com](https://fathimah.docs.apiary.io/)

Saya sendiri belum tau apakah projek ini masih diurus atau tidak, tapi Rest API dari sini tersedia gratis.
Kalau teman-teman ada waktu mungkin bisa coba cek terlebih dahulu.
Di websitenya sudah tersedia dokumentasi yang cukup untuk menerangkan berbagai endpoint Yang tersedia.

## [Al Quran API by Bachors](https://github.com/bachors/Al-Quran-ID-API)

API dari Bachors yang legendaris ini sayangnya datang dengan dokumentasi yang minim.
Datanya juga hanya tersedia dalam bahasa Indonesia, jadi hanya cocok untuk aplikasi bahasa Indonesia.

## [API by SutanLab](https://api.quran.sutanlab.id/)

API yang masih cukup muda, masih butuh beberapa saat untuk bisa mengatakan bahwa API nya sudah cukup untuk kalian mengembangkan aplikasi kalian.
Tapi seharusnya untuk aplikasi dasar sudah cukup mumpuni buat temen-temen.
Di deploy di Vercel yang punya reputasi baik.
Tinggal melihat apakah repsonse nya selalu baik setiap kali kalian hit.

## [Equran.id](https://equran.id/apidev)

Website Al Quran Digital Bahasa Indonesia yang menyediakan API gratis untuk Developer. Pada API tersebut terdapat detail surat, tafsir, dan terjemahan dari tiap ayat Al-Quran. Tersedia pula audio untuk setiap surat. Sumber utama dari data yang terdapat pada API ini adalah Aplikasi Quran Kementrian Agama Republik Indonesia dan audio murottal Misyari Rasyid Al-'Afasi.

Terima kasih,

Semoga bermanfaat!
