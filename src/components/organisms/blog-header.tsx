import Link from 'next/link'

export default function BlogHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
      <div>
        <h2 className="font-montserrat text-3xl font-bold text-[#0B2C4D]">Blog & Artikel Wisata</h2>
        <p className="mt-2 font-inter text-gray-600 max-w-xl">
          Inspirasi perjalanan, tips liburan, dan rekomendasi destinasi terbaik di Indonesia untuk menemani rencana
          liburanmu.
        </p>
      </div>
      <Link
        href="/pages/blog-article"
        className="inline-flex items-center gap-2 font-inter font-semibold text-[#FB8C00] hover:underline whitespace-nowrap"
      >
        LIHAT SEMUA <span>→</span>
      </Link>
    </div>
  )
}