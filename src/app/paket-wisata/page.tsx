import PageHeaderSection from '@/components/organisms/page-header-paket'
import ExclusivePackagesSection from '@/components/organisms/exclusive-packages'
import DestinationGallerySection from '@/components/organisms/destination-gallery'
import BlogSection from '@/components/organisms/blog-section'
import NewsletterSection from '@/components/organisms/newsletter-section'

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
