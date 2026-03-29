"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { brand } from '../lib/siteData';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/products', label: 'Products' },
  { href: '/order', label: 'Order' },
  { href: '/contact', label: 'Contact' },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { totalItems } = useCart();

  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <Link href="/" className="brand" aria-label="AFRICHIQUE home">
          <Image src={brand.logo} width={44} height={44} alt="Logo" className="logo" />
          <span className="brand-text">{brand.name}</span>
        </Link>

        <nav className="nav-desktop">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={pathname === item.href ? 'active' : ''}>
              {item.label}
            </Link>
          ))}
          <Link href="/order" className={pathname === '/order' ? 'active' : ''}>
            Cart ({totalItems})
          </Link>
          {!user ? (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </>
          ) : (
            <>
              <span aria-label="User">Hi, {user.name}</span>
              <button type="button" onClick={logout} className="btn btn-outline" style={{ marginLeft: '0.5rem' }}>
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
