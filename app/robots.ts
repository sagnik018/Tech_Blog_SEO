export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://your-vercel-url.vercel.app/sitemap.xml",
  };
}
