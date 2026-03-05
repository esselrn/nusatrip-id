import Image from 'next/image'

const guides = [
  {
    name: 'Rose Angelina',
    role: 'Tour Guide',
    image: '/assets/team/rose.jpg',
    facebook: 'https://facebook.com/login',
    instagram: 'https://instagram.com/login'
  },
  {
    name: 'Udin David',
    role: 'Tour Guide',
    image: '/assets/team/udin.jpg',
    facebook: 'https://facebook.com/login',
    instagram: 'https://instagram.com/login'
  },
  {
    name: 'Siti Melissa',
    role: 'Tour Guide',
    image: '/assets/team/siti.jpg',
    facebook: 'https://facebook.com/login',
    instagram: 'https://instagram.com/login'
  }
]

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function TeamGuideSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <h2 className="text-3xl md:text-4xl font-semibold text-[#0B2C4D]">Tim Pemandu Wisata Kami</h2>
        <p className="mt-4 text-sm text-slate-500 leading-relaxed">
          Kami didukung oleh pemandu wisata profesional yang berpengalaman, ramah, dan memahami setiap destinasi dengan baik.
          Tim kami siap menemani perjalanan Anda dan memastikan setiap momen liburan berjalan lancar dan menyenangkan.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => (
          <div key={guide.name} className="group relative overflow-hidden rounded-3xl h-[420px] cursor-pointer">
            {/* Photo */}
            <Image
              src={guide.image}
              alt={guide.name}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />

            {/* Dark overlay on hover */}
            <div className="absolute inset-0 bg-[#0B2C4D]/0 group-hover:bg-[#0B2C4D]/70 transition duration-500" />

            {/* Tour Guide label — top right, visible on hover */}
            <div className="absolute top-5 right-0 opacity-0 group-hover:opacity-100 transition duration-300">
              <div className="bg-[#FB8C00] text-white text-xs font-semibold px-3 py-1 rounded-l-full tracking-widest uppercase">
                Tour Guide
              </div>
            </div>

            {/* Social icons — right side, visible on hover */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition duration-300 delay-100">
              <a
                href={guide.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#FB8C00] hover:bg-orange-600 text-white flex items-center justify-center transition shadow-lg"
              >
                <FacebookIcon />
              </a>
              <a
                href={guide.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#FB8C00] hover:bg-orange-600 text-white flex items-center justify-center transition shadow-lg"
              >
                <InstagramIcon />
              </a>
            </div>

            {/* Name & role — bottom, always visible */}
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
              <p className="text-white font-bold text-xl leading-tight">{guide.name}</p>
              <p className="text-white/70 text-sm mt-0.5">{guide.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
