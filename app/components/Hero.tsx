import Link from 'next/link';
import { brand } from '../lib/siteData';

export default function Hero() {
  return (
    <section className="hero" style={{ backgroundImage: `url(${brand.heroImage})` }}>
      <div className="hero-overlay" />
      <div className="container hero-content">
        <p className="eyebrow">{brand.tagline}</p>
        <h1>{brand.heroHeading}</h1>
        <p>{brand.heroSubtitle}</p>
        <div className="hero-cta">
          {brand.cta.map((button) => (
            <Link key={button.href} href={button.href} className={`btn ${button.style}`}>
              {button.text}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
