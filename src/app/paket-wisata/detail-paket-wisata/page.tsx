import PageHeaderSection from "@/components/sections/paket-wisata/detail/page-header"
import DetailLayout from "@/components/layouts/detail-layout"
import GallerySection from "@/components/sections/paket-wisata/detail/gallery"
import SidebarBooking from "@/components/sections/paket-wisata/detail/booking-sidebar"

export default function DetailPaketWisata() {
  return (
    <main>
      <PageHeaderSection />

      {/* FULL WIDTH GALLERY */}
      <section className="max-w-[1200px] mx-auto px-6 mt-16">
        <GallerySection />
      </section>

      {/* CONTENT + SIDEBAR */}
      <DetailLayout
        sidebar={<SidebarBooking />}
      >
        {/* nanti diisi:
            - Info Paket
            - Include / Exclude
            - Itinerary
            - Map
        */}
      </DetailLayout>
    </main>
  )
}