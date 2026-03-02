// src/components/organisms/destination-card.tsx
import Image from 'next/image'
import Rating from '@/components/atoms/rating'
import Price from '@/components/atoms/price'
import Button from '@/components/atoms/button'
import type { Destination } from '@/types/destinations'

type DestinationCardProps = Destination & {
  small?: boolean
}

export default function DestinationCard({
  id,
  thumbnail_url,
  name,
  rating,
  short_description,
  price_per_person,
  small = false,
}: DestinationCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
      <div className={`relative w-full ${small ? 'h-[180px]' : 'h-[260px]'}`}>
        <Image
          src={thumbnail_url ?? '/assets/placeholder.jpg'}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-5">
        <h3 className="font-montserrat text-lg text-[#0B2C4D] mb-1">{name}</h3>

        <Rating value={rating ?? 0} />

        <p className="font-inter text-sm text-gray-600 my-4">{short_description}</p>

        <div className="flex items-center justify-between">
          <Price value={price_per_person} />
          <Button href={`/destinasi/${id}`}>PESAN SEKARANG →</Button>
        </div>
      </div>
    </div>
  )
}