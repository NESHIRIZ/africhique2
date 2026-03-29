"use client";

import { FormEvent, useState } from 'react';

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main>
      <section className="page-hero small">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Let us talk about your wardrobe vision.</p>
        </div>
      </section>

      <section className="container section contact-grid">
        <div>
          <h2>Studio</h2>
          <p>12 Heritage Lane, Bulawayo, Zimbabwe</p>
          <p><strong>Phone/WhatsApp:</strong> <a href="tel:+263771234567">+263 77 123 4567</a></p>
          <p><strong>Email:</strong> <a href="mailto:hello@africhique.co.zw">hello@africhique.co.zw</a></p>
        </div>

        <form onSubmit={onSubmit} className="form" aria-live="polite">
          <h2>Send a Message</h2>
          <label>Name
            <input type="text" required />
          </label>
          <label>Email
            <input type="email" required />
          </label>
          <label>Message
            <textarea rows={6} required />
          </label>
          <button className="btn btn-gold" type="submit">Send</button>
          {sent && <p className="form-hint success">Message sent successfully! We will get back to you shortly.</p>}
        </form>
      </section>
    </main>
  );
}
