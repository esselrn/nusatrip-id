import Image from "next/image"

export default function InformationBanner() {
  return (
    <section className="w-full py-20">
      <div className="relative max-w-[1440px] mx-auto h-[450px] rounded-xl overflow-hidden">
        
        {/* Background Image */}
        <Image
          src="/assets/labuanbajo01.jpg"
          alt="Informasi Destinasi Wisata"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full px-6">
          <div className="text-center max-w-3xl">
            <h2 className="text-white text-2xl md:text-4xl font-semibold leading-tight">
              Kami Menyediakan Destinasi Terbaik yang Dipersonalisasi untuk
              Kenyamanan Anda
            </h2>

            <button className="mt-8 inline-flex items-center gap-2 bg-[#FB8C00] hover:bg-[#e67e00] text-white px-6 py-3 rounded-lg font-inter font-semibold transition">
              JELAJAHI PAKET
              <span>→</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}