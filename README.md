<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# WattWise ⚡️

**WattWise** adalah aplikasi web manajemen listrik pintar yang membantu Anda memantau, menghitung, dan memprediksi biaya penggunaan listrik harian dan bulanan berdasarkan perangkat elektronik di rumah Anda.

Aplikasi ini berjalan 100% di browser sisi klien dengan antarmuka modern yang cepat dan ringan.

## Fitur Utama ✨
- **Kalkulator Biaya Listrik:** Hitung estimasi tagihan bulanan berdasarkan perangkat yang Anda gunakan.
- **Dukungan Tarif PLN Terbaru:** Pilihan lengkap golongan tarif PLN mulai dari Subsidi, Non-Subsidi, hingga Industri.
- **Prediksi Usia Token:** Masukkan sisa token Anda, dan aplikasi akan memprediksi sisa hari / jam sebelum listrik Anda habis.
- **Analisis Penggunaan Cerdas:** Menyoroti perangkat yang memakan daya paling besar untuk penghematan maksimal.
- **Penyimpanan Lokal:** Seluruh data peralatan dan konfigurasi disimpan dengan aman secara lokal di browser Anda.

## Prasyarat 📋
- [Node.js](https://nodejs.org/) (versi 18 ke atas disarankan)

## Cara Menjalankan Secara Lokal 🚀
1. Kloning repositori ini:
   ```bash
   git clone https://github.com/bayusedana26/wattwise-app.git
   ```
2. Masuk ke folder proyek:
   ```bash
   cd wattwise-app
   ```
3. Instal dependencies:
   ```bash
   npm install
   ```
4. Jalankan aplikasi di mode pengembangan:
   ```bash
   npm run dev
   ```
5. Buka `http://localhost:3000` di browser Anda!

## Membangun untuk Produksi 📦
Untuk membangun aplikasi siap pakai (Production Build):
```bash
npm run build
```
Hasil build akan berada di dalam folder `dist` dan siap di-*deploy* ke platform seperti Vercel, Netlify, atau Firebase Hosting.

---
*Dibangun dengan React, Vite, dan TailwindCSS.*
