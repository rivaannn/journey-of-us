# Alur Pembuatan Aplikasi (Fitur Surat)

Dokumen ini menjelaskan langkah-langkah (workflow) dalam membangun fitur seperti halaman "Surat Cinta" ini dari nol. Ini akan membantu Anda memahami bagaimana potongan-potongan kode saling terhubung.

## Langkah 1: Perencanaan & Desain Data
Sebelum menulis kode UI, tentukan dulu data apa yang akan dikelola.
- **Pertanyaan**: Apa saja atribut sebuah surat?
- **Hasil**: Kita butuh `id`, `title`, `date`, `preview`, dan `content`.
- **File**: `src/hooks/useLetters.ts` (Interface `Letter`) dan `src/data/letters.ts` (Data dummy/awal).

## Langkah 2: Membuat Logika Bisnis (Custom Hook)
Pisahkan logika (cara kerja) dari tampilan (UI). Ini praktik terbaik di React.
- **Tujuan**: Membuat fungsi untuk mengelola state surat (tambah, edit, hapus).
- **Hasil**: File `src/hooks/useLetters.ts`.
  - Menggunakan `useState` untuk menyimpan array surat.
  - Menggunakan `useEffect` untuk sinkronisasi dengan Local Storage.
  - Mengekspos fungsi `addLetter`, `updateLetter`, `deleteLetter`.

## Langkah 3: Membuat Kerangka Halaman (UI Structure)
Buat file halaman dan susun elemen dasar HTML/JSX nya.
- **File**: `src/pages/Letters.tsx`.
- **Komponen**:
  - Header (Judul halaman).
  - Grid/List (Tempat menampilkan daftar surat).
  - Modal/Dialog (Untuk form tambah/edit dan baca surat).

## Langkah 4: Menghubungkan Logika ke UI
Panggil hook yang sudah dibuat di Langkah 2 ke dalam halaman di Langkah 3.

```typescript
// Di dalam src/pages/Letters.tsx
const { letters, addLetter, updateLetter, deleteLetter } = useLetters();
```

- Gunakan `letters` untuk me-render daftar kartu (`letters.map(...)`).
- Pasang `deleteLetter` pada tombol hapus.
- Siapkan state lokal untuk form (`formData`) guna menampung input user sebelum dikirim ke `addLetter` atau `updateLetter`.

## Langkah 5: Implementasi Interaksi & Animasi
Agar aplikasi terasa "hidup" dan premium.
- **Library**: `framer-motion` digunakan untuk animasi halus (muncul perlahan, hover effect).
- **Interaksi**:
  - Saat kartu diklik -> Buka modal baca.
  - Saat tombol tambah diklik -> Buka modal form.

## Langkah 6: Menambahkan Fitur Keamanan (Opsional)
Karena ini surat pribadi, kita tambahkan proteksi sederhana.
- **Logika**: Cek apakah user sudah memasukkan PIN yang benar (`210322`).
- **Implementasi**:
  - State `isAuthenticated`.
  - Fungsi `checkAuth` yang membungkus aksi sensitif (edit/hapus/tambah). Jika belum auth, tampilkan modal PIN dulu.

## Ringkasan Struktur Folder

```
src/
├── data/
│   └── letters.ts       # Data awal (sumber kebenaran pertama)
├── hooks/
│   └── useLetters.ts    # Otak dari fitur (logika CRUD)
├── pages/
│   └── Letters.tsx      # Wajah dari fitur (Tampilan & Interaksi)
└── components/          # Komponen pendukung (tombol, judul, dll)
```

Dengan memahami alur ini, Anda bisa meniru pola yang sama untuk membuat fitur lain, misalnya "Daftar Lagu Favorit" atau "Galeri Foto".
