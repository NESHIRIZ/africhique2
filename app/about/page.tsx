import Link from 'next/link';

export default function AboutPage() {
  return (
    <main>
      <section className="page-hero small">
        <div className="container">
          <h1>Our Story</h1>
          <p>Blending heritage craftsmanship with contemporary design for modern Africa.</p>
        </div>
      </section>

      <section className="container section about-grid">
        <div>
          <h2 className="serif">Africhique was Born to Empower</h2>
          <p>From our studio in Bulawayo, we reimagine traditional African textures into elevated garments and bags. Each item is quality-checked and proudly made with sustainable and locally sourced materials.</p>
          <ul>
            <li>Custom design + sizing tailored to your body.</li>
            <li>Authentic patterns from local artisans.</li>
            <li>Fast, friendly customer service across Zimbabwe.</li>
          </ul>
          <p>Our collection combines timeless elegance with modern urban comfort, serving clients who value style, craft and cultural expression.</p>
          <Link href="/products" className="btn btn-gold">Shop Best Sellers</Link>
        </div>

        <aside className="about-card">
          <h3>Our Values</h3>
          <ul>
            <li>Integrity</li>
            <li>Craftsmanship</li>
            <li>Sustainability</li>
            <li>Community uplift</li>
          </ul>
        </aside>
      </section>
    </main>
  );
}
