# Laporkeun Server
Servis penyedia untuk klien aplikasi Laporkeun Client
## Memulai penyiapan server
1. Pastikan memiliki instalasi 
>XAMPP/LAMPP/MAMP

>git cli

>DBeaver atau HeidiSQL atau phpmyadmin

>Node.js dan NPM/Yarn
2. Clone kode server dengan `git clone https://github.com/DrDhemm/laporkeun-server.git`
3. Masuk direktori dengan `cd laporkeun-server`
4. Buat database bernama `laporkeun` pada MySQL menggunakan DBeaver atau HeidiSQL atau phpmyadmin
5. Lalu import konfigurasi database yang berada didalam folder `laporkeun-server/DB Export`
6. Atur konfigurasi environment value dengan membuat filebaru dengan path `laporkeun-server/.env`
7. Isi file (.env) meliputi (kapitalisasi harus persis),
    - DB_USERNAME, nama user pada MySQL
    - DB_PASSWORD, paswword user pada MySQL (jika tidak ada kosongi)
    - ACCESS_TOKEN_SECRET, gunakan kombinasi karakter random (bebas)
    - REFRESH_TOKEN_SECRET, gunakan kombinasi karakter random (bebas)
8. Lanjutkan dengan melakukan `npm i` dan `npm i nodemon` pada direktori utama `laporkeun-client`
9. Lalu jalankan server dengan perintah `npm run dev`
10. Server berhasil berjalan jika pada terminal tampil `nodemon` dan log `Database present!`
## Detail
- Server dibuat menggunakan Node.js dan framework Express.js.
- Server dibuat oleh [drDhemm](https://github.com/DrDhemm). 2021