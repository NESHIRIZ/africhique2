import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <section>
          <h4>About Africhique</h4>
          <p>We craft elegant African attire and premium bags, blending heritage patterns with modern tailoring.</p>
        </section>
        <section>
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/products">Products</Link></li>
            <li><Link href="/order">Order</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </section>
        <section>
          <h4>Designers</h4>
          <p>Upload your product photos to <code>public/assets/images/</code> and reference them in <code>app/lib/siteData.ts</code>.</p>
          <p>Logo path is <code>/assets/images/logo2.svg</code>.</p>
        </section>
        <section>
          <h4>Stay in Touch</h4>
          <p>Join our email list for new arrivals and offers.</p>
        </section>
      </div>
      <div className="footer-bottom">
        <div className="container">© {new Date().getFullYear()} Africhique. All rights reserved.</div>
      </div>
    </footer>
  );
}
