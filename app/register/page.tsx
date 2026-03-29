"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { register } = useAuth();
  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password.length < 6) {
      setError('Password should be at least 6 characters.');
      return;
    }

    const result = await register(name.trim(), email.trim(), password);
    if (result.success) {
      setSuccess('Account created. Redirecting...');
      setTimeout(() => router.push('/'), 800);
    } else {
      setError(result.message);
    }
  };

  return (
    <main>
      <section className="page-hero small">
        <div className="container">
          <h1>Create Account</h1>
          <p>Join Africhique for premium fabrics, faster checkout and order tracking.</p>
        </div>
      </section>

      <section className="container section auth-container">
        <form onSubmit={onSubmit} className="auth-card" autoComplete="on">
          <div className="auth-header">
            <h2>Register</h2>
            <p>Create your Africhique shopping profile.</p>
          </div>

          <div className="form-row">
            <label htmlFor="register-name">Full Name</label>
            <input
              id="register-name"
              type="text"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
            />
          </div>

          <div className="form-row">
            <label htmlFor="register-email">Email address</label>
            <input
              id="register-email"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div className="form-row">
            <label htmlFor="register-password">Password</label>
            <input
              id="register-password"
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a strong password"
              minLength={6}
            />
          </div>

          <button type="submit" className="btn btn-gold btn-full">
            Create Account
          </button>

          {error && <p className="form-hint form-error">{error}</p>}
          {success && <p className="form-hint form-success">{success}</p>}

          <p className="form-footnote">
            Already registered?{' '}
            <Link href="/login" className="link">
              Log in
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}
