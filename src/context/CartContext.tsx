"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  version?: string;
  badge?: string | null;
  imageUrl?: string | null;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
  totalAmount: number;
  itemCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Wczytanie koszyka z localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("deloskiyt_cart");
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Błąd odczytu koszyka:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Zapis do localStorage przy zmianie
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("deloskiyt_cart", JSON.stringify(items));
      } catch (e) {
        console.error("Błąd zapisu koszyka:", e);
      }
    }
  }, [items, isLoaded]);

  const addToCart = (item: CartItem) => {
    setItems((prev) => {
      if (prev.some((p) => p.id === item.id)) {
        return prev;
      }
      return [...prev, item];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const isInCart = (id: string) => {
    return items.some((item) => item.id === id);
  };

  const totalAmount = items.reduce((sum, item) => sum + (item.price || 0), 0);
  const itemCount = items.length;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        totalAmount,
        itemCount,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart musi być używane wewnątrz CartProvider");
  }
  return context;
}
