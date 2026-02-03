import PageHeaderSection from '@/components/sections/pages/blog-article/page-header'
import ArticleHeroImage from '@/components/sections/pages/blog-article/article-hero-image'
import ArticleContent from '@/components/sections/pages/blog-article/article-content'
import ArticleGallery from '@/components/sections/pages/blog-article/article-gallery'
import CommentForm from '@/components/sections/pages/blog-article/comment-form'

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
