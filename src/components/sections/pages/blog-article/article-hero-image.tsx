import Image from 'next/image'

export default function ArticleHeroImage() {
  return (
    <section className="w-full flex justify-center">
      <div className="relative max-w-[1316px] w-full h-[520px] mx-[62px]">
        <Image src="/assets/nusapenida02.jpg" alt="Nusa Penida" fill priority className="object-cover rounded-xl" />
      </div>
    </section>
  )
}