# 🌙 Selamat Idul Fitri 1447H

Halaman ucapan Hari Raya Idul Fitri dari Keluarga Alm. Yonni Muhazir.

## Tech Stack
- **React.js** — UI framework
- **Tailwind CSS** — Styling
- **Netlify** — Deployment

---

## ⚙️ Setup Sebelum Deploy

### 1. Ganti Nomor WhatsApp
Buka file `src/App.jsx`, cari baris ini di bagian atas:

```js
const WA_NUMBER = "62XXXXXXXXXX"; // Ganti dengan nomor WA kamu
```

Ganti `62XXXXXXXXXX` dengan nomor WA kamu, contoh:
```js
const WA_NUMBER = "6281234567890";
```

### 2. (Opsional) Ubah Pesan WhatsApp Default
Masih di `src/App.jsx`, ubah teks pesan di `WA_MESSAGE`:

```js
const WA_MESSAGE = encodeURIComponent(
  "Wa'alaikumsalam! Minal Aidin wal Faizin, mohon maaf lahir dan batin juga ya 🙏🌙"
);
```

---

## 🚀 Deploy ke Netlify

### Cara 1 — Via GitHub (Direkomendasikan)

1. Push project ini ke GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Idul Fitri 1447H"
   git remote add origin https://github.com/USERNAME/REPO.git
   git push -u origin main
   ```

2. Buka [netlify.com](https://netlify.com) → **Add new site** → **Import from Git**
3. Pilih repo GitHub kamu
4. Build settings sudah otomatis terbaca dari `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `build`
5. Klik **Deploy site** → selesai! 🎉

### Cara 2 — Netlify CLI (Manual)

```bash
# Install dependencies dulu
npm install

# Build project
npm run build

# Deploy via Netlify CLI
npx netlify-cli deploy --prod --dir=build
```

---

## 🛠️ Jalankan Lokal

```bash
npm install
npm start
```

Buka [http://localhost:3000](http://localhost:3000)

---

*Taqabbalallahu minna wa minkum* 🌙
