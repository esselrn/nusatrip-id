import PageHeaderSection from '@/components/organisms/article-header'
import ArticleHeroImage from '@/components/molecules/article-hero-image'
import ArticleContent from '@/components/molecules/article-content'
import ArticleGallery from '@/components/organisms/article-gallery'
import CommentForm from '@/components/molecules/comment-form'

export default function BlogDetailPage() {
  return (
    <>
      <PageHeaderSection />

      {/* JARAK SETELAH HEADER */}
      <div className="pt-[100px]" />

      {/* FOTO BESAR */}
      <ArticleHeroImage />

      {/* KONTEN TENGAH (173px) */}
      <section className="px-[173px] mt-[100px]">
        <ArticleContent />
        <ArticleGallery />
        <CommentForm />
      </section>
    </>
  )
}
