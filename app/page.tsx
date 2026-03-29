import { brand, featuredProducts, features } from './lib/siteData';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';

export default function HomePage() {
  return (
    <main>
      <Hero />

      <section className="container section">
        <header className="section-head">
          <h2>Signature Collections</h2>
          <p>Discover our bestsellers — premium fabrics, authentic African motifs.</p>
        </header>
        <div className="grid cards-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} item={product} />
          ))}
        </div>
      </section>

      <section className="pattern-band">
        <div className="container band-inner">
          <h3>Custom Tailoring</h3>
          <p>Bring your vision — we’ll cut, fit, and finish to perfection.</p>
          <a href="/contact" className="btn btn-outline">Start a Custom Enquiry</a>
        </div>
      </section>

      <section className="container section">
        <header className="section-head">
          <h2>Why Choose Africhique</h2>
        </header>
        <div className="grid features">
          {features.map((feature) => (
            <article key={feature.title} className="feature">
              <h4>{feature.title}</h4>
              <p>{feature.desc}</p>
            </article>
          ))}
        </div>
      </section>

    </main>
  );
}
