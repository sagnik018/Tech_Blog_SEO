"use client";

export default function CategoryFilter({
  categories,
  active,
  onChange,
}: {
  categories: string[];
  active: string;
  onChange: (cat: string) => void;
}) {
  return (
    <div className="flex gap-2 flex-wrap mb-4">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-3 py-1 rounded text-sm ${
            active === cat
              ? "bg-black text-white"
              : "bg-gray-200"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
