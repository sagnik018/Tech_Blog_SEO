export default function Footer() {
  return (
    <footer className="bg-white mt-12 border-t">
      <div className="max-w-7xl mx-auto px-4 py-6 text-sm text-gray-600">
        © {new Date().getFullYear()} Tech Blog. All rights reserved.
      </div>
    </footer>
  );
}
