// src/components/organisms/destination-section.tsx
'use client'

import { useEffect, useState } from 'react'
import DestinationCard from '@/components/organisms/destination-card'
import { getDestinations, Destination } from '@/services/destinations.service'

type Props = {
  variant?: 'home' | 'page'
}

export default function DestinationSection({ variant = 'page' }: Props) {
  const [destinations, setDestinations] = useState<Destination[]>([])

  useEffect(() => {
    getDestinations().then(setDestinations).catch(console.error)
  }, [])

  const featured = destinations.slice(0, 2)
  const regular = destinations.slice(2, 5)

  // HOME — tidak diubah
  if (variant === 'home') {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-montserrat text-3xl md:text-4xl text-[#0B2C4D] mb-4">Destinasi Unggulan Indonesia</h2>
            <p className="text-gray-600">Jelajahi destinasi wisata terbaik pilihan kami</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {featured.map((item) => (
              <DestinationCard key={item.id} {...item} />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {regular.map((item) => (
              <DestinationCard key={item.id} {...item} small />
            ))}
          </div>
        </div>
      </section>
    )
  }

  // PAGE — 2 besar + 3 kecil
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-montserrat text-3xl md:text-4xl text-[#0B2C4D] mb-4">Destinasi Unggulan Indonesia</h2>
          <p className="text-gray-600">Jelajahi destinasi wisata paling populer di Indonesia dengan paket perjalanan terbaik dan terpercaya dari NusaTrip.</p>
        </div>

        {/* 2 BESAR */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {featured.map((item) => (
            <DestinationCard key={item.id} {...item} />
          ))}
        </div>

        {/* 3 KECIL */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {regular.map((item) => (
            <DestinationCard key={item.id} {...item} small />
          ))}
        </div>
      </div>
    </section>
  )
}