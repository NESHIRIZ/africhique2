import './globals.css';
import type { Metadata } from 'next';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

export const metadata: Metadata = {
  title: 'AFRICHIQUE — Elegant African Clothing & Bags',
  description: 'Africhique designs elegant African clothing and premium bags from Zimbabwe.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <SiteHeader />
            {children}
            <SiteFooter />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
