export default function Footer() {
  return (
    <footer className="bg-gray-100 py-6 mt-16">
      <div className="max-w-7xl mx-auto px-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} ShopZone. All rights reserved.
      </div>
    </footer>
  );
}
