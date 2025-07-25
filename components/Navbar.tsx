'use client';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/logo.png';

export default function Navbar() {
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

        <nav className="space-x-6">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">Home</Link>
          <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900">About</Link>
          <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
