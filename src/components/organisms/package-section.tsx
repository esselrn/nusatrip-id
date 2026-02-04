import PackageItem from "@/components/organisms/package-item"
import { packages } from "@/constants/packages"

export default function PackageSection() {
  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A2540]">
            Paket Wisata Eksklusif NusaTrip
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Pilihan paket perjalanan terbaik untuk menikmati keindahan Indonesia.
          </p>
        </div>

        <div className="space-y-20">
          {packages.map((item) => (
            <PackageItem key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}