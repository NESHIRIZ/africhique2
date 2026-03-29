"use client";

import { useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../lib/siteData';

const categories = ['all', 'clothing', 'bags', 'accessories'];

export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const visibleProducts = useMemo(() => {
    const lowerSearch = search.toLowerCase();
    return products.filter((item) => {
      const matchCategory = category === 'all' || item.cat === category;
      const matchSearch = item.title.toLowerCase().includes(lowerSearch) || item.desc.toLowerCase().includes(lowerSearch);
      return matchCategory && matchSearch;
    });
  }, [search, category]);

  return (
    <main>
      <section className="page-hero small">
        <div className="container">
          <h1>Products & Prices</h1>
          <p>Browse premium African styles, with custom consultations available for every order.</p>
        </div>
      </section>

      <section className="container section">
        <div className="toolbar">
          <input
            id="search"
            className="input"
            type="search"
            placeholder="Search products..."
            aria-label="Search products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="select" aria-label="Filter category">
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="grid cards-3">
          {visibleProducts.length ? (
            visibleProducts.map((product) => <ProductCard key={product.id} item={product} />)
          ) : (
            <div className="empty-state">No products found. Try another search query.</div>
          )}
        </div>
      </section>
    </main>
  );
}
