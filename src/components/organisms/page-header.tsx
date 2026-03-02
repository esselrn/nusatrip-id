// src/components/organisms/page-header.tsx
import Image from 'next/image'
import Location from '@/components/atoms/location'

type Props = {
  title: string
  subtitle: string
  backgroundImage: string
}

export default function PageHeaderSection({ title, subtitle, backgroundImage }: Props) {
  return (
    <section className="relative w-full h-[250px]">
      <Image src={backgroundImage} alt={title} fill priority className="object-cover" />

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="max-w-[1440px] w-full px-6 text-center flex flex-col items-center">
          <h1 className="font-montserrat font-bold text-white text-2xl md:text-4xl mb-3">{title}</h1>
          <Location location={subtitle} className="justify-center" />
        </div>
      </div>
    </section>
  )
}