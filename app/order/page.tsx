"use client";

import Image from 'next/image';
import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function OrderPage() {
  const { user } = useAuth();
  const { items, totalAmount, updateQty, removeItem, clearCart } = useCart();
  const [status, setStatus] = useState('');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (items.length === 0) {
      setStatus('Your cart is empty. Add a product first.');
      return;
    }
    setStatus('Thanks! Your enquiry was submitted. We will contact you within 24 hours.');
    clearCart();
  };

  if (!user) {
    return (
      <main>
        <section className="page-hero small">
          <div className="container">
            <h1>Login Required</h1>
            <p>You need to log in before placing an order.</p>
            <Link href="/login" className="btn btn-gold" style={{ marginTop: '1rem' }}>
              Go to Login
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="page-hero small">
        <div className="container">
          <h1>Your Order</h1>
          <p>Ready to order? Submit your enquiry and we will reach out within 24 hours.</p>
        </div>
      </section>

      <section className="container section order-wrap">
        <div className="order-form">
          <h2>Order Enquiry</h2>
          <form onSubmit={onSubmit}>
            <label>
              Full Name
              <input type="text" name="name" defaultValue={user.name} required />
            </label>
            <label>
              Phone / WhatsApp
              <input type="tel" name="phone" required />
            </label>
            <label>
              Email (optional)
              <input type="email" name="email" defaultValue={user.email} />
            </label>
            <label>
              Notes / Sizes / Colours
              <textarea name="notes" rows={5} placeholder="e.g., Size M, kitenge print, pickup Bulawayo" />
            </label>
            <button type="submit" className="btn btn-gold full">
              Send Enquiry
            </button>
            {status && <p className="form-hint success">{status}</p>}
          </form>
        </div>

        <aside className="cart">
          <h2>Order Cart</h2>
          {items.length === 0 ? (
            <p className="form-hint">Your cart is empty. Go to Products and add items.</p>
          ) : (
            <>
              <div className="cart-items">
                {items.map((item) => (
                  <article key={item.id} className="cart-item" style={{ padding: '0.7rem', marginBottom: '0.5rem' }}>
                    <Image
                      src={item.img}
                      alt={item.title}
                      width={64}
                      height={48}
                      style={{ objectFit: 'cover', borderRadius: '8px' }}
                    />
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.price}</p>
                      <label>
                        Qty
                        <input
                          type="number"
                          min={1}
                          value={item.qty}
                          onChange={(e) => updateQty(item.id, Number(e.target.value))}
                          style={{ width: '64px' }}
                        />
                      </label>
                    </div>
                    <button type="button" className="btn btn-outline" onClick={() => removeItem(item.id)}>
                      Remove
                    </button>
                  </article>
                ))}
              </div>
              <p className="cart-summary">Total: ${totalAmount.toFixed(2)}</p>
              <button type="button" className="btn btn-outline" onClick={clearCart}>
                Clear Cart
              </button>
            </>
          )}
          <p className="form-hint" style={{ marginTop: '.75rem' }}>
            Add products from <Link href="/products">Products</Link> page. After submission, we will contact you on WhatsApp +263 77 123 4567 to finalize.
          </p>
        </aside>
      </section>
    </main>
  );
}

