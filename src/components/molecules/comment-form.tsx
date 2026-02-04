import Input from '@/components/atoms/input'
import Button from '@/components/atoms/button'

export default function CommentForm() {
  return (
    <section className="max-w-[970px] mx-auto mb-24">
      <h3 className="text-xl font-semibold text-[#0B2C4D] mb-2">Tinggalkan Komentar</h3>

      <p className="text-sm text-gray-500 mb-8">
        Alamat email Anda tidak akan dipublikasikan. Kolom wajib diisi ditandai dengan *
      </p>

      {/* KOMENTAR */}
      <div className="mb-8">
        <label className="block mb-2 text-sm font-medium">Komentar *</label>
        <textarea
          className="w-full h-[180px] p-4 border border-gray-300 rounded-lg shadow-sm
          focus:ring-2 focus:ring-[#FB8C00] outline-none"
        />
      </div>

      {/* NAMA */}
      <div className="mb-8">
        <label className="block mb-2 text-sm font-medium">Nama *</label>
        <Input placeholder="Nama Anda" />
      </div>

      {/* EMAIL */}
      <div className="mb-8">
        <label className="block mb-2 text-sm font-full">Email *</label>
        <Input placeholder="Email Anda" />
      </div>

      {/* WEBSITE */}
      <div className="mb-10">
        <label className="block mb-2 text-sm font-medium">Website</label>
        <Input placeholder="Website (opsional)" />
      </div>

      <Button>KIRIM KOMENTAR</Button>
    </section>
  )
}
