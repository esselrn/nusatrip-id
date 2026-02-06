export type Package = {
  id: number
  title: string
  image: string
  rating: number
  price: string
  duration: string
  desc: string
}

export const packages: Package[] = [
  {
    id: 1,
    title: 'Paket Raja Ampat',
    image: '/assets/rajaampat.jpg',
    rating: 4.9,
    price: 'Rp8.500.000',
    duration: '4 Hari 3 Malam',
    desc: 'Eksplorasi surga bawah laut Raja Ampat dengan snorkeling, island hopping, dan panorama alam.'
  },
  {
    id: 2,
    title: 'Paket Lombok Eksotis',
    image: '/assets/lombok.jpg',
    rating: 4.8,
    price: 'Rp4.200.000',
    duration: '3 Hari 2 Malam',
    desc: 'Nikmati keindahan Pantai Kuta Mandalika, Gili Trawangan, dan budaya Sasak.'
  },
  {
    id: 3,
    title: 'Paket Karimunjawa',
    image: '/assets/karimunjawa.jpg',
    rating: 4.8,
    price: 'Rp3.700.000',
    duration: '3 Hari 2 Malam',
    desc: 'Snorkeling, hopping island, dan sunset di pulau tropis alami.'
  },
  {
    id: 4,
    title: 'Paket Danau Toba',
    image: '/assets/danautoba.jpg',
    rating: 4.7,
    price: 'Rp3.900.000',
    duration: '3 Hari 2 Malam',
    desc: 'Wisata budaya Batak dan panorama danau vulkanik terbesar di Asia Tenggara.'
  },
  {
    id: 5,
    title: 'Paket Tana Toraja',
    image: '/assets/tanatoraja.jpg',
    rating: 4.6,
    price: 'Rp4.800.000',
    duration: '4 Hari 3 Malam',
    desc: 'Wisata budaya unik dengan rumah adat Tongkonan dan pegunungan.'
  }
]
