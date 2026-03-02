// src/app/destinasi/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { getDestinations } from '@/services/destinations.service'
import type { Destination } from '@/types/destinations'
import DestinationCard from '@/components/organisms/destination-card'

export default function DestinationPage() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDestinations()
      .then(setDestinations)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-gray-500">Memuat destinasi...</p>
      </div>
    )
  }

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">Destinasi Unggulan Indonesia</h1>
        <p className="text-gray-500 mt-2 max-w-md mx-auto">
          Jelajahi destinasi wisata paling populer di Indonesia dengan paket perjalanan terbaik dan terpercaya dari NusaTrip.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((dest) => (
          <DestinationCard key={dest.id} {...dest} />
        ))}
      </div>
    </section>
  )
}