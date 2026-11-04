import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, MapPin, MessageCircle, CheckCircle, Loader2 } from 'lucide-react';
import { SiTiktok } from 'react-icons/si';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, firebaseReady } from '../lib/firebase';
import { site } from '../data/site';
import { usePageTitle } from '../hooks/usePageTitle';

const ease = [0.22, 1, 0.36, 1];

// Keep in sync with the `inquiries` rule in firestore.rules.
const topics = ['General question', 'Ingredients & allergens', 'Wholesale & stockists', 'Press & partnerships', 'Something else'];

const fieldClass =
  'w-full px-4 py-3.5 bg-[#F5F1E8]/[0.04] border border-[#F5F1E8]/15 text-[#F5F1E8] text-sm placeholder-[#F5F1E8]/30 focus:outline-none focus:border-[#D4AF65] transition-colors duration-300';
const labelClass = 'block text-[#F5F1E8]/60 text-[10px] font-semibold tracking-[0.3em] uppercase mb-2.5';

function ContactForm() {
  const [topic, setTopic] = useState(topics[0]);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    if (form.get('company')) return setStatus('sent'); // honeypot: bots fill every field

    const inquiry = {
      name: String(form.get('name')).trim().slice(0, 100),
      email: String(form.get('email')).trim().slice(0, 200),
      topic,
      message: String(form.get('message')).trim().slice(0, 4000),
    };

    // Without Firebase configured, fall back to the visitor's email app.
    if (!firebaseReady) {
      if (!site.contactEmail) return setStatus('error');
      const body = `${inquiry.message}\n\n${inquiry.name}\n${inquiry.email}`;
      window.location.href = `mailto:${site.contactEmail}?subject=${encodeURIComponent(`Royal T: ${topic}`)}&body=${encodeURIComponent(body)}`;
      return setStatus('sent');
    }

    setStatus('sending');
    try {
      await addDoc(collection(db, 'inquiries'), { ...inquiry, createdAt: serverTimestamp() });
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div className="flex flex-col items-center text-center py-16" role="status">
        <CheckCircle className="w-12 h-12 text-[#D4AF65] mb-5" strokeWidth={1.5} />
        <h2 className="font-display text-3xl mb-3">Message received.</h2>
        <p className="text-[#F5F1E8]/55 text-sm max-w-xs">Thanks for reaching out. We read every message and will reply to the email you gave us.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <fieldset>
        <legend className={labelClass}>What's it about?</legend>
        <div className="flex flex-wrap gap-2">
          {topics.map((t) => (
            <label
              key={t}
              className={`cursor-pointer px-4 py-2.5 rounded-full border text-xs transition-colors duration-300 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#D4AF65]/60 ${
                topic === t ? 'border-[#D4AF65] bg-[#D4AF65]/15 text-[#F5F1E8]' : 'border-[#F5F1E8]/15 text-[#F5F1E8]/60 hover:border-[#D4AF65]/50'
              }`}
            >
              <input type="radio" name="topic" value={t} checked={topic === t} onChange={() => setTopic(t)} className="sr-only" />
              {t}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-name" className={labelClass}>Name</label>
          <input id="contact-name" name="name" required maxLength={100} autoComplete="name" className={fieldClass} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>Email</label>
          <input id="contact-email" name="email" type="email" required maxLength={200} autoComplete="email" className={fieldClass} placeholder="you@example.com" />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>Message</label>
        <textarea id="contact-message" name="message" required minLength={10} maxLength={4000} rows={6} className={`${fieldClass} resize-y`} placeholder="How can we help?" />
      </div>

      {/* Honeypot, hidden from people */}
      <div className="absolute -left-[5000px]" aria-hidden="true">
        <input type="text" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-300" role="alert">
          Sorry, that didn't send. Please try again, or message us on{' '}
          <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="underline hover:text-[#D4AF65]">Instagram</a>.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 bg-gradient-to-r from-[#E4C57E] via-[#D4AF65] to-[#B98F3E] text-[#080808] text-xs font-bold tracking-[0.25em] uppercase hover:shadow-[0_0_40px_rgba(212,175,101,0.35)] transition-shadow duration-300 disabled:opacity-60"
      >
        {status === 'sending' && <Loader2 className="w-4 h-4 animate-spin" />}
        {status === 'sending' ? 'Sending' : 'Send Message'}
      </button>
    </form>
  );
}

export const Contact = () => {
  usePageTitle('Contact Us');

  const channels = [
    { icon: Instagram, label: 'Instagram', detail: 'DM us any time', href: site.social.instagram },
    { icon: SiTiktok, label: 'TikTok', detail: 'Follow along', href: site.social.tiktok },
    { icon: MapPin, label: 'Based in', detail: `${site.location}. Shipping within Illinois at launch.` },
  ];

  return (
    <div className="min-h-screen bg-[#1A1714] text-[#F5F1E8]">
      <section className="relative pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[700px] h-[500px] rounded-full bg-[#E5A638]/10 blur-[160px] pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-14">
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <p className="text-[#D4AF65] text-[10px] sm:text-xs font-semibold tracking-[0.4em] uppercase mb-6">Contact Us</p>
            <h1 className="font-display text-5xl sm:text-6xl leading-[1.05] mb-6">Get in<br />Touch.</h1>
            <p className="text-[#F5F1E8]/65 text-lg leading-relaxed mb-12 max-w-md">
              Questions about the bars, allergens, wholesale or press? Send us a note and a real person will get back to you.
            </p>

            <ul className="space-y-4">
              {channels.map(({ icon: Icon, label, detail, href }) => {
                const inner = (
                  <>
                    <span className="w-11 h-11 rounded-full border border-[#D4AF65]/35 flex items-center justify-center flex-shrink-0 text-[#D4AF65]">
                      <Icon className="w-[18px] h-[18px]" />
                    </span>
                    <span>
                      <span className="block font-display text-lg">{label}</span>
                      <span className="block text-[#F5F1E8]/50 text-sm">{detail}</span>
                    </span>
                  </>
                );
                return (
                  <li key={label}>
                    {href ? (
                      <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group hover:[&_.font-display]:text-[#D4AF65]">
                        {inner}
                      </a>
                    ) : (
                      <div className="flex items-center gap-4">{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-12 pt-8 border-t border-[#F5F1E8]/10 flex items-start gap-3 text-sm text-[#F5F1E8]/55">
              <MessageCircle className="w-5 h-5 text-[#D4AF65] flex-shrink-0 mt-0.5" />
              <p>
                Quick question? It might already be answered in our{' '}
                <Link to="/learn-more#faq" className="text-[#D4AF65] hover:underline">FAQ</Link>.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
          >
            <div className="relative bg-[#2A251F] border border-[#D4AF65]/15 p-6 sm:p-10">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF65]/60 to-transparent" />
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
