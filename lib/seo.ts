import { BlogPost } from "./types";

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Tech Blog",
  url: "https://your-vercel-url.vercel.app",
};

export const articleSchema = (post: BlogPost) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: post.title,
  description: post.description,
  image: post.photo_url,
  datePublished: post.created_at,
  dateModified: post.updated_at,
});
