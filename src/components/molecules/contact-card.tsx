// src/components/organisms/paket-wisata/contact-card.tsx

import Image from 'next/image'
import { Phone, Mail } from 'lucide-react'

export default function ContactCard() {
  return (
    <div className="relative w-full rounded-xl overflow-hidden min-h-[200px]">
      <Image src="/assets/nusapenida01.jpg" alt="Contact Background" fill className="object-cover" />

      {/* Dark blue overlay */}
      <div className="absolute inset-0 bg-[#0B2C4D]/85" />

      <div className="relative z-10 p-6 text-white">
        <h4 className="text-xl font-bold mb-2">Punya Pertanyaan?</h4>

        <p className="text-sm text-white/85 mb-5 leading-relaxed">
          Jangan ragu untuk menghubungi kami. Tim NusaTrip siap membantu perjalanan Anda.
        </p>

        <div className="space-y-3">
          <a href="tel:+6285861556201" className="flex items-center gap-3 text-sm hover:text-orange-300 transition">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Phone size={14} />
            </div>
            <span>+62858 6155 6201</span>
          </a>

          <a href="mailto:info@nusatrip.id" className="flex items-center gap-3 text-sm hover:text-orange-300 transition">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Mail size={14} />
            </div>
            <span>info@nusatrip.id</span>
          </a>
        </div>
      </div>
    </div>
  )
}