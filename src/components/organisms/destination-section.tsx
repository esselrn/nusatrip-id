'use client'

import { useEffect, useState } from 'react'
import DestinationCard from '@/components/organisms/destination-card'
import { getDestinations, Destination } from '@/services/destinations.service'

export default function DestinationSection() {
  const [destinations, setDestinations] = useState<Destination[]>([])

  useEffect(() => {
    getDestinations().then(setDestinations).catch(console.error)
  }, [])

  const featured = destinations.filter((d) => d.is_featured)
  const regular = destinations.filter((d) => !d.is_featured)

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-6">
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-montserrat text-3xl md:text-4xl text-[#0B2C4D] mb-4">Destinasi Unggulan Indonesia</h2>
          <p className="text-gray-600">Jelajahi destinasi wisata terbaik pilihan kami</p>
        </div>

        {/* FEATURED */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {featured.map((item) => (
            <DestinationCard key={item.id} {...item} />
          ))}
        </div>

        {/* REGULAR */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {regular.map((item) => (
            <DestinationCard key={item.id} {...item} small />
          ))}
        </div>
      </div>
    </section>
  )
}