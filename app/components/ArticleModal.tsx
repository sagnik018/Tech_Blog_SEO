"use client";

import { BlogPost } from "@/lib/types";
import Image from "next/image";
import { useEffect } from "react";
import { articleSchema } from "@/lib/seo";

export default function ArticleModal({
  post,
  onClose,
}: {
  post: BlogPost;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema(post)),
        }}
      />

      <article
        onClick={(e) => e.stopPropagation()}
        className="bg-white max-w-3xl p-6 rounded overflow-y-auto max-h-[90vh]"
      >
        <button
          onClick={onClose}
          className="float-right text-xl"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-2">
          {post.title}
        </h2>

        <time className="text-sm text-gray-500">
          {new Date(post.created_at).toLocaleDateString(
            "en-US",
            { month: "short", day: "numeric", year: "numeric" }
          )}
        </time>

        <Image
          src={post.photo_url}
          alt={`Image for ${post.title}`}
          width={800}
          height={400}
          className="my-4 rounded"
        />

        <div
          dangerouslySetInnerHTML={{
            __html: post.content_html,
          }}
        />
      </article>
    </div>
  );
}
