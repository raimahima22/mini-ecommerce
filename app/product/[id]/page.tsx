'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useProductStore } from '@/store/productStore';
import { useCartStore } from '@/store/cartStore';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import { useCheckoutStore } from '@/store/checkoutStore';

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
  const router = useRouter();
  const selectedProduct = useProductStore((state) => state.selectedProduct);
  const addToCart = useCartStore((state) => state.addToCart);
  const { setItems } = useCheckoutStore();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadProduct = async () => {
      if (selectedProduct && selectedProduct.id === id) {
        setProduct(selectedProduct);
        setLoading(false);
      } else {
        try {
          const res = await fetch(
            `https://api.freeapi.app/api/v1/public/randomproducts/${id}`
          );
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

  const handleQuantityChange = (value: string) => {
    const num = parseInt(value);
    if (!isNaN(num) && num > 0 && num < 100) {
      setQuantity(num);
    }
  };

  const handleBuyNow = () => {
    if (!product) return;

    const buyNowProduct = {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: quantity,
      thumbnail: product.thumbnail,
    };

    setItems([buyNowProduct]); // ✅ Only this product is selected
    router.push('/checkout');
  };

  if (loading) return <div className="text-center mt-12">Loading...</div>;

  if (!product) {
    return (
      <div className="text-center mt-12 text-red-500">
        Product not found. Please go back and select a product again.
      </div>
    );
  }

  return (
    <><Navbar></Navbar>
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Left: Images */}
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

        {/* Right: Info */}
        <Card className="shadow-xl border rounded-2xl">
          <CardContent className="p-6 space-y-4">
            <Badge variant="outline" className="uppercase text-xs font-medium">
              {product.category}
            </Badge>

            <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>

            <p className="text-2xl text-green-600 font-semibold">${product.price}</p>

            <p className="text-gray-700 text-sm leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse euismod nisi in sem
              volutpat, nec tincidunt sapien dignissim.
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-2 mt-4">
              <label htmlFor="qty" className="text-sm text-gray-600">
                Quantity:
              </label>
              <Input
                id="qty"
                type="number"
                min={1}
                max={99}
                value={quantity}
                onChange={(e) => handleQuantityChange(e.target.value)}
                className="w-20"
              />
            </div>

            {/* Add to Cart */}
            <Button
              className="w-full mt-4"
              onClick={() => {
                addToCart({
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  thumbnail: product.thumbnail,
                  quantity,
                });
                toast.success('Added to cart', {
                  description: `${product.title} x${quantity}`,
                  action: {
                    label: 'Go to Cart',
                    onClick: () => router.push('/cart'),
                  },
                });
              }}
            >
              Add to Cart
            </Button>

            {/* ✅ Buy Now Button */}
            <Button className="w-full mt-2" variant="secondary" onClick={handleBuyNow}>
              Buy Now
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  );
}
