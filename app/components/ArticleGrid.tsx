"use client";

import { BlogPost } from "@/lib/types";
import { useState } from "react";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import ArticleCard from "./ArticleCard";
import ArticleModal from "./ArticleModal";

export default function ArticleGrid({
  posts,
}: {
  posts: BlogPost[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<BlogPost | null>(null);

  const categories = ["All", ...new Set(posts.map(p => p.category))];

  const filtered = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query) ||
      post.content_text.toLowerCase().includes(query);

    const matchesCategory =
      category === "All" || post.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 mt-8">
      <SearchBar onSearch={setQuery} />
      <CategoryFilter
        categories={categories}
        active={category}
        onChange={setCategory}
      />

      <p className="text-sm mb-4">
        {filtered.length} results found
      </p>

      {filtered.length === 0 && (
        <p>No results found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((post) => (
          <ArticleCard
            key={post.id}
            post={post}
            onClick={() => setSelected(post)}
          />
        ))}
      </div>

      {selected && (
        <ArticleModal
          post={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
