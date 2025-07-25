'use client';
import Image from 'next/image';
import Link from 'next/link';
import Shop from '@/assets/shopping.png';

const HeroSection = () => {
  return (
    <section className="bg-pink-50  px-6 sm:px-12 rounded-xl shadow mb-10 relative overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Text section */}
        <div className="max-w-xl">
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-800 mb-4 leading-tight">
            Discover Your Style
          </h1>
          <p className="text-lg text-gray-500 mb-6">
            Shop the latest fashion trends, gadgets, and everyday essentials in one place.
          </p>
          <Link
            href="/"
            className="inline-block bg-pink-600 text-white px-6 py-3 rounded-full font-medium hover:bg-pink-700 transition"
          >
            Start Shopping
          </Link>
        </div>

        {/* Image section */}
        <div className="w-150 relative mt-10 ">
          <Image
            src={Shop}
            alt="Shopping Banner"
            width={500}
            height={500}
            className="rounded-lg object-cover w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
