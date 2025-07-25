'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useProductStore } from '@/store/productStore';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Product {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
  images: string[];
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const selectedProduct = useProductStore((state) => state.selectedProduct);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      if (selectedProduct && selectedProduct.id === id) {
        setProduct(selectedProduct);
        setLoading(false);
      } else {
        try {
          const res = await fetch(`https://api.freeapi.app/api/v1/public/randomproducts/${id}`);
          const json = await res.json();
          if (json.success && json.data) {
            setProduct(json.data);
          } else {
            setProduct(null);
          }
        } catch (err) {
          console.error('Failed to fetch product:', err);
          setProduct(null);
        } finally {
          setLoading(false);
        }
      }
    };

    loadProduct();
  }, [id, selectedProduct]);

  if (loading) return <div className="text-center mt-12">Loading...</div>;

  if (!product) {
    return (
      <div className="text-center mt-12 text-red-500">
        Product not found. Please go back and select a product again.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Left: Main Thumbnail */}
        <div>
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
          />
          <div className="grid grid-cols-4 gap-4 mt-4">
            {product.images?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`product-${idx}`}
                className="w-full h-24 object-cover rounded-md border"
              />
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <Card className="shadow-xl border rounded-2xl">
          <CardContent className="p-6 space-y-4">
            <Badge variant="outline" className="uppercase text-xs font-medium">
              {product.category}
            </Badge>

            <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>

            <p className="text-2xl text-green-600 font-semibold">${product.price}</p>

            <p className="text-gray-700 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse euismod nisi in
              sem volutpat, nec tincidunt sapien dignissim.
            </p>

            <Button className="w-full mt-4">Add to Cart</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
