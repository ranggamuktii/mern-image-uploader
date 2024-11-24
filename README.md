# MERN Image Uploader

Aplikasi MERN (MongoDB, Express, React, Node.js) sederhana untuk mengunggah dan menampilkan gambar.

## Instalasi dan Penggunaan

### Prasyarat

- Node.js (versi 14 atau lebih baru)
- MongoDB (berjalan di `localhost:5000`)

### Backend Setup

1. Buka terminal, arahkan ke direktori `backend/`.
2. Inisialisasi proyek Node.js baru:

```bash
npm init -y
```

3. Install dependencies:

```bash
npm install express multer mongoose cors
```

4. Buat file `index.js` di direktori `backend/` dan tambahkan kode backend.
5. Buat direktori `uploads/` di dalam direktori `backend/`.
6. Jalankan server backend:

```bash
node index.js
```

### Frontend Setup

1. Buka terminal, arahkan ke direktori `frontend/`.
2. Inisialisasi proyek Vite baru dengan React template:

```bash
npm create vite@latest frontend -- --template react
```

3. Pindah ke direktori `frontend/` dan install dependencies:

```bash
cd frontend
npm install
```

4. Buat file `App.jsx` dan `main.jsx` di dalam direktori `src/`.
5. Buka file `vite.config.js` dan tambahkan konfigurasi server proxy.
6. Jalankan aplikasi frontend:

```bash
npm run dev
```

### Menjalankan Aplikasi

1. Pastikan server MongoDB berjalan di `localhost:5000`.
2. Jalankan server backend di direktori `backend/`:

```bash
node index.js
```

3. Jalankan aplikasi frontend di direktori `frontend/`:

```bash
npm run dev
```

4. Buka `http://localhost:5173` di browser Anda untuk mengakses aplikasi.

## Struktur Direktori

mern-image-uploader/
├── backend/
│ ├── config/
│ │ └── mongodb.js
│ ├── models/
│ │ └── Image.js
│ ├── index.js
│ ├── package.json
│ └── uploads/
└── frontend/
├── index.html
├── package.json
├── src/
│ ├── App.jsx
│ └── main.jsx
└── vite.config.js

## Fitur

- Unggah gambar ke server
- Tampilkan daftar gambar yang telah diunggah
- Simpan metadata gambar ke database MongoDB

## Kontribusi

Kontribusi dalam bentuk apa pun sangat dihargai. Jika Anda menemukan bug atau memiliki saran untuk peningkatan, silakan buka issue baru di repositori ini.
