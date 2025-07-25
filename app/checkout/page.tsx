'use client';

import { useCartStore } from '@/store/cartStore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useCheckoutStore } from "@/store/checkoutStore";
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { clearCart } = useCartStore();
  const router = useRouter();
  const { items } = useCheckoutStore(); // ✅ Use selected checkout items
  const [form, setForm] = useState({ name: '', email: '', address: '' });

  const selectedItems = items;
  const total = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.address || selectedItems.length === 0) return;

    clearCart(); // Clear entire cart — optional: clear only purchased items
    router.push('/success');
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 md:px-6 space-y-8">
      <h1 className="text-3xl font-bold text-center text-gray-800">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Billing Information */}
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl p-6 space-y-5">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Billing Details</h2>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Full Name</label>
            <Input
              placeholder="Your full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Email Address</label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Shipping Address</label>
            <Input
              placeholder="123 Street, City"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              required
            />
          </div>

          <Button type="submit" className="w-full mt-4" disabled={selectedItems.length === 0}>
            {selectedItems.length === 0 ? 'Select items to place order' : 'Place Order'}
          </Button>
        </form>

        {/* Order Summary */}
        <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Order Summary</h2>

          {selectedItems.length === 0 ? (
            <p className="text-red-500 text-sm">No items selected for checkout.</p>
          ) : (
            <div className="space-y-4">
              {selectedItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{item.title}</p>
                    <p className="text-xs text-gray-500">
                      {item.quantity} × ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-gray-700">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}

              <hr className="my-4 border-gray-200" />
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 