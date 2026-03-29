"use client";

import Image from 'next/image';
import type { Product } from '../lib/types';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function ProductCard({ item }: { item: Product }) {
  const { user } = useAuth();
  const { addItem } = useCart();
  const addToCart = () => {
    if (!user) return;
    addItem({ id: item.id, title: item.title, price: item.price, img: item.img });
  };

  return (
    <article className="card" data-cat={item.cat}>
      <div className="card-media">
        <Image src={item.img} alt={item.title} width={500} height={420} className="card-img" />
      </div>
      <div className="card-body">
        <h3>{item.title}</h3>
        <p>{item.desc}</p>
        <div className="card-meta">
          <span className="price">{item.price}</span>
          <button type="button" className="btn btn-add" onClick={addToCart} disabled={!user}>
            {user ? 'Add to Cart' : 'Login to Add'}
          </button>
        </div>
      </div>
    </article>
  );
}
