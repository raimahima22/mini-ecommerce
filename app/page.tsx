'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useProductStore } from '@/store/productStore';
import HeroSection from '@/components/HeroSection';

interface Product {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
  images: string[];
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const setSelectedProduct = useProductStore((state) => state.setSelectedProduct);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          'https://api.freeapi.app/api/v1/public/randomproducts?page=1&limit=40&inc=category%252Cprice%252Cthumbnail%252Cimages%252Ctitle%252Cid'
        );
        const json = await res.json();
        if (!json.success || !json.data || !Array.isArray(json.data.data)) {
          throw new Error('Invalid response format.');
        }
        setProducts(json.data.data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };

    fetchProducts();
  }, []);

  // Derive unique categories
  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category || 'Other')))];

  // Filter products based on selected category
  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <main className="px-4 md:px-12 py-8 max-w-7xl mx-auto">
      <HeroSection />

      <div className="flex flex-col md:flex-row gap-8 mt-12">
        {/* Category Sidebar */}
        <aside className="md:w-1/4">
          <div className="bg-white shadow-md rounded-xl p-4 sticky top-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Categories</h2>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category}>
                  <button
                    className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium transition ${
                      selectedCategory === category
                        ? 'bg-pink-600 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-pink-100'
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Product Display */}
        <section className="md:w-3/4">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            {selectedCategory === 'All' ? 'All Products' : selectedCategory}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Link
                href={`/product/${product.id}`}
                key={product.id}
                onClick={() => setSelectedProduct(product)}
              >
                <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border overflow-hidden group">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-4">
                    <h3
                      className="text-lg font-medium text-gray-900 truncate"
                      title={product.title}
                    >
                      {product.title}
                    </h3>
                    <div className="flex gap-2 mt-2 mb-4">
                      {product.images.slice(0, 3).map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`product-${product.id}-img-${index}`}
                          className="w-10 h-10 object-cover rounded-md border"
                          onError={(e) =>
                            ((e.target as HTMLImageElement).src =
                              'https://via.placeholder.com/50')
                          }
                        />
                      ))}
                    </div>
                    <p className="text-xl font-bold text-green-600">${product.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
