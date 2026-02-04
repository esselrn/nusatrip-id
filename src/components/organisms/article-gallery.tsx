import Image from 'next/image'

export default function ArticleGallery() {
  return (
    <div className="max-w-[970px] mx-auto grid grid-cols-2 gap-6 mb-20">
      <div className="relative h-[350px] rounded-xl overflow-hidden">
        <Image src="/assets/nusapenida01.jpg" alt="Broken Beach" fill className="object-cover" />
      </div>

      <div className="relative h-[350px] rounded-xl overflow-hidden">
        <Image src="/assets/nusapenida02.jpg" alt="Angel’s Billabong" fill className="object-cover" />
      </div>
    </div>
  )
}