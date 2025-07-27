'use client';

import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/logo.png';
import { ShoppingCart } from 'lucide-react'; // icon
import { useCartStore } from '@/store/cartStore'; // adjust path if needed
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { cart } = useCartStore();
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + item.quantity, 0);
    setItemCount(total);
  }, [cart]);

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-12 w-auto">
            <Image
              src={logo}
              alt="Shop Smart Logo"
              width={48}
              height={48}
              style={{ width: 'auto', height: '100%', objectFit: 'contain' }}
              priority
            />
          </div>
          <span className="text-lg font-semibold text-gray-800 tracking-tight">Shop Smart</span>
        </Link>

        <nav className="space-x-6 flex items-center">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">Home</Link>
          {/* <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900">About</Link> */}
          
          
          {/* Cart Icon */}
          <Link href="/cart" className="relative inline-flex items-center text-gray-600 hover:text-gray-900">
            <ShoppingCart size={22} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                {itemCount}
              </span>
            )}
          </Link>
          <Link href="/admin/login" className="text-blue-500 ">
          Admin Login
        </Link>
        </nav>
      </div>
    </header>
  );
}
