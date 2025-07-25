// components/ProductCard.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ProductCard({ product }: { product: any }) {
  return (
    <Card className="hover:shadow-lg transition">
      <Link href={`/product/${product.id}`}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-48 object-cover rounded-t-xl"
        />
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold">{product.title}</h3>
          <p className="text-sm text-gray-500 capitalize">{product.category}</p>
          <div className="mt-2 font-bold text-lg">${product.price}</div>
          {/* <Button className="w-full mt-4">View</Button> */}
        </CardContent>
      </Link>
    </Card>
  );
}
