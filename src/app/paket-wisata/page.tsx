import PageHeaderSection from "@/components/sections/paket-wisata/page-header"
import ExclusivePackagesSection from "@/components/sections/paket-wisata/exclusive-packages"
import DestinationGallerySection from "@/components/sections/paket-wisata/destination-gallery"
import BlogSection from "@/components/sections/home/blog-section"
import NewsletterSection from "@/components/sections/home/newsletter-section"

export default function PaketWisataPage() {
  return (
    <>
      <PageHeaderSection />
      <ExclusivePackagesSection />
      <DestinationGallerySection />
      <BlogSection />
      <NewsletterSection />
    </>
  )
}