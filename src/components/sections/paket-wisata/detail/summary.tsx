import { SectionTitle } from "@/components/molecules/section/section-title"
import { FileText } from "lucide-react"

export default function Summary() {
  return (
    <div className="mb-10">
      <SectionTitle
        icon={<FileText size={18} />}
        title="Ringkasan"
      />

      <p className="text-gray-600 text-sm leading-relaxed">
        Paket wisata Raja Ampat 4 Hari 3 Malam menawarkan pengalaman menjelajahi
        keindahan alam Papua Barat yang terkenal dengan pulau-pulau karst,
        perairan laut biru yang jernih, serta kekayaan bawah laut yang luar biasa.
        Perjalanan ini dirancang untuk memberikan kenyamanan dan fleksibilitas,
        cocok bagi wisatawan yang ingin menikmati Raja Ampat tanpa terburu-buru.
        <br /><br />
        Selama perjalanan, peserta akan diajak mengunjungi beberapa destinasi
        unggulan, menikmati aktivitas wisata bahari, serta merasakan suasana
        alam yang masih alami dengan didampingi pemandu berpengalaman.
      </p>
    </div>
  )
}