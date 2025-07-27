"use client";

import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useCheckoutStore } from "@/store/checkoutStore";
import Image from "next/image";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCartStore();
  const router = useRouter();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { setItems } = useCheckoutStore();

  const toggleSelectItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const isSelected = (id: string) => selectedItems.includes(id);

  const toggleSelectAll = () => {
    if (selectedItems.length === cart.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cart.map((item) => item.id));
    }
  };

  const total = cart
    .filter((item) => isSelected(item.id))
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (selectedItems.length === 0) return;
    const selectedProducts = cart.filter((item) =>
      selectedItems.includes(item.id)
    );
    setItems(selectedProducts);
    router.push("/checkout");
  };

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-10">
        <h1 className="text-3xl font-bold text-center">Your Cart</h1>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center text-gray-500 space-y-4">
            <Image
              src="/empty-cart.svg" // optional illustrative placeholder
              alt="Empty Cart"
              width={200}
              height={200}
              className="opacity-80"
            />
            <p className="text-lg">Your cart is empty.</p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedItems.length === cart.length}
                onChange={toggleSelectAll}
                className="scale-125 accent-primary"
              />
              <label className="text-sm font-medium text-gray-700">
                Select All
              </label>
            </div>

            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border rounded-lg p-4 shadow-sm"
                >
                  <input
                    type="checkbox"
                    checked={isSelected(item.id)}
                    onChange={() => toggleSelectItem(item.id)}
                    className="scale-125 accent-primary mt-1 sm:mt-0"
                  />
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="flex-1 w-full">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-semibold">{item.title}</h2>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Price: ${item.price}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <label className="text-sm">Quantity:</label>
                      <Input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value))
                        }
                        className="w-20"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t">
              <p className="text-2xl font-semibold text-gray-800">
                Total: ${total.toFixed(2)}
              </p>
              <Button
                disabled={selectedItems.length === 0}
                onClick={handleCheckout}
                className="mt-4 sm:mt-0"
              >
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
