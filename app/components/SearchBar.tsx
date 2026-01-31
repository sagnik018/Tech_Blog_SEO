"use client";

export default function SearchBar({
  onSearch,
}: {
  onSearch: (value: string) => void;
}) {
  return (
    <input
      type="text"
      placeholder="Search articles..."
      className="w-full border p-2 rounded mb-4"
      onChange={(e) => onSearch(e.target.value.toLowerCase())}
    />
  );
}
