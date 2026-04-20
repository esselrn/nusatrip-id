# nusatrip-id

> Platform booking travel Indonesia — tiket, hotel, dan destinasi wisata Nusantara, dalam satu tempat.

![Next.js](https://img.shields.io/badge/Next.js_16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white)
![Groq](https://img.shields.io/badge/Groq_AI-F55036?style=flat-square)
![Vercel](https://img.shields.io/badge/Vercel-black?style=flat-square&logo=vercel)

---

## Tentang project

Nusatrip-ID adalah platform booking travel berbasis web yang memudahkan pengguna mencari, memfilter, dan memesan tiket transportasi serta akomodasi di seluruh wilayah Indonesia. Dilengkapi fitur AI untuk rekomendasi perjalanan dan dashboard personal untuk mengelola histori pemesanan.

---

## Fitur utama

- **Autentikasi** — Login, register, dan manajemen sesi via Supabase Auth
- **Search & Filter** — Cari destinasi, tiket, dan hotel dengan filter lengkap
- **Booking / Reservasi** — Pemesanan tiket dan hotel langsung dari platform
- **AI Travel Assistant** — Rekomendasi perjalanan cerdas powered by Groq
- **Dashboard Profil** — Histori booking, favorit, dan pengaturan akun
- **Konten & Blog** — Artikel dan inspirasi destinasi wisata Nusantara

---

## Tech stack

| Layer       | Teknologi                              |
|-------------|----------------------------------------|
| Framework   | Next.js 16.1.1 (App Router, Turbopack) |
| Language    | TypeScript + JavaScript                |
| Styling     | Tailwind CSS                           |
| Auth + DB   | Supabase (Auth, PostgreSQL, Storage)   |
| AI          | Groq API                               |
| Runtime     | Node.js                                |
| Deployment  | Vercel                                 |

---

## Memulai

**Prasyarat:** Node.js 18+, project Supabase aktif, dan Groq API key.

```bash
git clone https://github.com/username/nusatrip-id.git
cd nusatrip-id
pnpm install
```

Buat file `.env.local` di root project:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GROQ_API_KEY=your_groq_api_key
```

```bash
pnpm dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

---

## Struktur project

```
nusatrip-id/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── ai-recommend/     # Groq streaming endpoint
│   │   │   ├── search/           # Search & filter logic
│   │   │   └── booking/          # Booking handler
│   │   ├── (auth)/               # Login & register
│   │   ├── destinations/         # Halaman destinasi
│   │   ├── booking/              # Alur pemesanan
│   │   ├── blog/                 # Artikel & konten
│   │   └── account/              # Dashboard profil
│   ├── components/
│   │   ├── organisms/
│   │   └── ...
│   ├── contexts/
│   ├── lib/
│   ├── restapi/
│   ├── services/
│   ├── shared/
│   └── types/
├── .env.local
├── next.config.ts
├── tailwind.config.js
└── pnpm-lock.yaml
```

---

## Alur booking

```
Cari destinasi → Filter hasil → Pilih penawaran → Isi data pemesan → Konfirmasi & bayar → E-tiket / voucher
```

---

## Environment variables

| Variable                        | Cara mendapatkan                        |
|---------------------------------|-----------------------------------------|
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase → Project Settings → API       |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API       |
| `GROQ_API_KEY`                  | [console.groq.com](https://console.groq.com) |

Untuk deployment di Vercel, tambahkan semua variabel di **Project Settings → Environment Variables**.

---

## Deployment

Push ke branch `main` — Vercel otomatis deploy.

```bash
git add .
git commit -m "your message"
git push origin main
```

Tambahkan domain Vercel kamu di Supabase → **Authentication → URL Configuration → Redirect URLs**:

```
https://your-project.vercel.app/**
```

---

## Kontribusi

Project ini terbuka untuk kontribusi. Fork, buat branch baru, dan buka pull request. Pastikan mengikuti struktur komponen yang sudah ada.

---

## License

MIT