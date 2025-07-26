"use client";

import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { useCheckoutStore } from "@/store/checkoutStore";

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
      setSelectedItems([]); // Unselect all
    } else {
      setSelectedItems(cart.map((item) => item.id)); // Select all
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
  <Navbar/>
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <h1 className="text-3xl font-bold">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              checked={selectedItems.length === cart.length}
              onChange={toggleSelectAll}
              className="scale-125"
            />
            <label className="text-sm font-medium">Select All</label>
          </div>

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border-b py-4"
            >
              <input
                type="checkbox"
                checked={isSelected(item.id)}
                onChange={() => toggleSelectItem(item.id)}
                className="scale-125"
              />
              <img
                src={item.thumbnail}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-sm text-muted-foreground">
                  Price: ${item.price}
                </p>
                <p className="text-sm">Quantity: {item.quantity}</p>
              </div>
              <Input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.id, parseInt(e.target.value))
                }
                className="w-16"
              />
              <Button
                variant="destructive"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </Button>
            </div>
          ))}

          <div className="flex justify-between items-center pt-6 border-t">
            <p className="text-xl font-semibold">Total: ${total.toFixed(2)}</p>
            <Button
              disabled={selectedItems.length === 0}
              onClick={handleCheckout}
            >
              Checkout
            </Button>
          </div>
        </>
      )}
    </div>
    </>
  );
}
