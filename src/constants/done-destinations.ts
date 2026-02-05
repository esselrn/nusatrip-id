export type Destination = {
  image: string
  title: string
  rating: number
  description: string
  price: string
}

export const destinations: Destination[] = [
  {
    image: "/assets/prambanan.jpg",
    title: "Prambanan, Yogyakarta",
    rating: 4.8,
    description:
      "Nikmati keindahan candi Hindu terbesar di Indonesia dengan arsitektur megah dan nilai sejarah yang memukau.",
    price: "Rp. 2.900.000",
  },
  {
    image: "/assets/labuanbajo.jpg",
    title: "Labuan Bajo, NTT",
    rating: 4.9,
    description:
      "Jelajahi keindahan laut biru, pulau eksotis, dan pengalaman wisata alam yang tak terlupakan.",
    price: "Rp. 3.500.000",
  },
  {
    image: "/assets/borobudur.jpg",
    title: "Borobudur, Jawa Tengah",
    rating: 4.6,
    description:
      "Rasakan ketenangan dan keagungan candi Buddha terbesar di dunia.",
    price: "Rp. 2.500.000",
  },
  {
    image: "/assets/nusapenida.jpg",
    title: "Nusa Penida, Bali",
    rating: 4.8,
    description:
      "Pantai eksotis, tebing ikonik, dan laut biru jernih khas Bali.",
    price: "Rp. 3.000.000",
  },
  {
    image: "/assets/bromo.jpg",
    title: "Bromo, Jawa Timur",
    rating: 4.7,
    description:
      "Keindahan matahari terbit dengan latar pegunungan dan lautan pasir.",
    price: "Rp. 1.900.000",
  },
]