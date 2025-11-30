# Penjelasan CRUD Sederhana (Create, Read, Update, Delete)

Dokumen ini menjelaskan bagaimana operasi CRUD (Create, Read, Update, Delete) diimplementasikan dalam fitur "Surat Cinta" di aplikasi ini.

## Apa itu CRUD?

CRUD adalah singkatan dari empat operasi dasar yang dapat dilakukan pada penyimpanan data:
- **C**reate (Membuat data baru)
- **R**ead (Membaca/Melihat data)
- **U**pdate (Memperbarui/Mengedit data)
- **D**elete (Menghapus data)

Dalam aplikasi ini, logika CRUD dipusatkan di dalam custom hook bernama `useLetters` yang terletak di `src/hooks/useLetters.ts`.

---

## 1. Struktur Data (Model)

Sebelum masuk ke operasi, kita mendefinisikan bentuk data (interface) untuk sebuah surat:

```typescript
export interface Letter {
  id: number;      // Identifikasi unik untuk setiap surat
  title: string;   // Judul surat
  date: string;    // Tanggal surat
  preview: string; // Cuplikan pendek
  content: string; // Isi lengkap surat
}
```

## 2. Implementasi Operasi

### Read (Membaca Data)
Aplikasi membaca data dari dua sumber:
1. **Local Storage**: Penyimpanan di browser pengguna (agar data tidak hilang saat di-refresh).
2. **Data Awal**: Data bawaan dari `src/data/letters.ts` jika Local Storage masih kosong.

```typescript
// src/hooks/useLetters.ts

const [letters, setLetters] = useState<Letter[]>(() => {
  // Coba ambil dari Local Storage
  const saved = localStorage.getItem('journey-letters');
  // Jika ada pakai yang disimpan, jika tidak pakai data awal
  return saved ? JSON.parse(saved) : initialLetters;
});
```

### Create (Membuat Data Baru)
Fungsi `addLetter` digunakan untuk menambah surat baru.

```typescript
const addLetter = (letter: Omit<Letter, 'id'>) => {
  const newLetter = {
    ...letter,
    id: Date.now(), // Membuat ID unik menggunakan waktu sekarang
  };
  // Menambahkan surat baru ke awal array (paling atas)
  setLetters(prev => [newLetter, ...prev]);
};
```

### Update (Memperbarui Data)
Fungsi `updateLetter` digunakan untuk mengedit surat yang sudah ada berdasarkan `id`-nya.

```typescript
const updateLetter = (id: number, updatedLetter: Omit<Letter, 'id'>) => {
  setLetters(prev => prev.map(l => 
    // Jika ID cocok, ganti dengan data baru. Jika tidak, biarkan tetap.
    l.id === id ? { ...updatedLetter, id } : l
  ));
};
```

### Delete (Menghapus Data)
Fungsi `deleteLetter` menghapus surat berdasarkan `id`.

```typescript
const deleteLetter = (id: number) => {
  // Filter array untuk membuang surat dengan ID yang cocok
  setLetters(prev => prev.filter(l => l.id !== id));
};
```

## 3. Penyimpanan (Persistence)

Agar data tidak hilang saat browser ditutup, kita menggunakan `useEffect` untuk menyimpan data ke `localStorage` setiap kali data `letters` berubah.

```typescript
useEffect(() => {
  localStorage.setItem('journey-letters', JSON.stringify(letters));
}, [letters]);

### Keterbatasan (PENTING!)
Karena menggunakan `localStorage`, data yang Anda buat (Create/Update) **hanya tersimpan di browser device yang Anda gunakan saat itu**.
- Jika Anda membuka aplikasi di HP lain, surat baru tidak akan muncul.
- Jika Anda membersihkan cache browser, data surat baru akan hilang.
- **Solusi**: Jika ingin surat bisa dibaca di semua device secara permanen, Anda harus menambahkannya secara manual ke dalam file `src/data/letters.ts` (Hardcode) atau menggunakan Database sungguhan (seperti Firebase/Supabase).
```

## 4. Penggunaan di UI (User Interface)

Di file `src/pages/Letters.tsx`, kita menggunakan hook tersebut:

```typescript
const { letters, addLetter, updateLetter, deleteLetter } = useLetters();
```

- **Menampilkan (Read)**: Kita melakukan looping `letters.map(...)` untuk menampilkan kartu surat.
- **Menambah (Create)**: Tombol "Tulis Surat" membuka form, dan saat disubmit memanggil `addLetter`.
- **Mengedit (Update)**: Ikon pensil memanggil `updateLetter` dengan data dari form.
- **Menghapus (Delete)**: Ikon sampah memanggil `deleteLetter`.

---
**Catatan Tambahan:**
Fitur ini juga dilengkapi dengan sistem keamanan sederhana (PIN) sebelum pengguna bisa melakukan operasi Create, Update, atau Delete, untuk menjaga agar surat tidak sembarangan diubah.
