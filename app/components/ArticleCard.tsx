import Image from "next/image";
import { BlogPost } from "@/lib/types";

export default function ArticleCard({
  post,
  onClick,
}: {
  post: BlogPost;
  onClick: () => void;
}) {
  return (
    <article
      onClick={onClick}
      tabIndex={0}
      className="bg-white rounded shadow cursor-pointer hover:shadow-lg focus:outline-none"
    >
      <Image
        src={post.photo_url}
        alt={`Thumbnail for ${post.title}`}
        width={400}
        height={200}
        className="rounded-t"
      />
      <div className="p-4">
        <h3 className="font-semibold mb-1">{post.title}</h3>
        <p className="text-sm text-gray-600">
          {post.description}
        </p>
      </div>
    </article>
  );
}
