'use client';
import Image from 'next/image';
import { useState } from 'react';

interface Product {
  _id: string;
  title: string;
  price: number;
  thumbnail: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => {
    if (quantity < 10) setQuantity(prev => prev + 1);
  };

  const decreaseQty = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden p-4 flex flex-col justify-between hover:shadow-lg transition">
      <Image
        src={product.thumbnail}
        alt={product.title}
        width={300}
        height={300}
        className="object-contain mx-auto h-48 w-full"
      />
      <h2 className="text-lg font-semibold mt-4 text-gray-800 line-clamp-2">{product.title}</h2>
      <p className="text-pink-600 text-xl font-bold mt-2">${product.price}</p>

      {/* Quantity Selector */}
      <div className="flex items-center gap-2 mt-4">
        <button
          onClick={decreaseQty}
          className="px-2 py-1 border rounded hover:bg-pink-100"
        >
          –
        </button>
        <span className="px-3 py-1 border rounded text-gray-700 bg-gray-100">{quantity}</span>
        <button
          onClick={increaseQty}
          className="px-2 py-1 border rounded hover:bg-pink-100"
        >
          +
        </button>
      </div>

      {/* Add to Cart Button */}
      <button className="mt-4 w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition">
        Add {quantity} to Cart
      </button>
    </div>
  );
}
