import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import ArticleGrid from "./components/ArticleGrid";
import { fetchBlogs } from "@/lib/api";
import { websiteSchema } from "@/lib/seo";

export default async function HomePage() {
  const data = await fetchBlogs();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Header />
      <main>
        <Hero />
        <ArticleGrid posts={data.blogs} />
      </main>
      <Footer />
    </>
  );
}
