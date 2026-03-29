'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type CartItem = { id: string; title: string; price: string; img: string; qty: number };

type CartContextType = {
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
  addItem: (item: Omit<CartItem, 'qty'>, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);
const CART_KEY = 'africhique_cart';

function readCart(): CartItem[] {
  try {
    const data = localStorage.getItem(CART_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) return [];
    return parsed as CartItem[];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(readCart());
  }, []);

  useEffect(() => {
    saveCart(items);
  }, [items]);

  const addItem = (item: Omit<CartItem, 'qty'>, quantity = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.id === item.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + quantity };
        return next;
      }
      return [...prev, { ...item, qty: quantity }];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQty = (id: string, qty: number) => {
    setItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: Math.max(1, qty) } : item))
        .filter((item) => item.qty > 0),
    );
  };

  const clearCart = () => setItems([]);

  const totalAmount = useMemo(() => {
    return items.reduce((sum, item) => {
      const priceValue = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
      return sum + priceValue * item.qty;
    }, 0);
  }, [items]);

  const totalItems = useMemo(() => items.reduce((sum, item) => sum + item.qty, 0), [items]);

  const value = useMemo(
    () => ({ items, totalAmount, totalItems, addItem, removeItem, updateQty, clearCart }),
    [items, totalAmount, totalItems],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
