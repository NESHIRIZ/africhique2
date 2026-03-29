"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const result = await login(email.trim(), password);
    if (result.success) {
      setSuccess('Welcome back! Redirecting...');
      setTimeout(() => router.push('/'), 800);
    } else {
      setError(result.message);
    }
  };

  return (
    <main>
      <section className="page-hero small">
        <div className="container">
          <h1>Member Login</h1>
          <p>Sign in to manage your cart, order and account details.</p>
        </div>
      </section>

      <section className="container section auth-container">
        <form onSubmit={onSubmit} className="auth-card" autoComplete="on">
          <div className="auth-header">
            <h2>Sign In</h2>
            <p>Secure access to your Africhique account.</p>
          </div>

          <div className="form-row">
            <label htmlFor="login-email">Email address</label>
            <input
              id="login-email"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div className="form-row">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              minLength={6}
            />
          </div>

          <button type="submit" className="btn btn-gold btn-full">
            Sign In
          </button>

          {error && <p className="form-hint form-error">{error}</p>}
          {success && <p className="form-hint form-success">{success}</p>}

          <p className="form-footnote">
            New to Africhique?{' '}
            <Link href="/register" className="link">
              Create an account
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}
