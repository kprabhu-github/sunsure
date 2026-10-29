'use client';
import { useState, type FormEvent } from 'react';
import { company } from '@/content/site';

export function ContactFormE() {
  const [err, setErr] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const submit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const f = new FormData(ev.currentTarget); const g = (k: string) => String(f.get(k) ?? '').trim();
    const e: Record<string, string> = {};
    if (!g('name')) e.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(g('email'))) e.email = 'Please enter a valid email address.';
    if (!g('message')) e.message = 'Please tell us how we can help.';
    if (!f.get('consent')) e.consent = 'Please agree to the Privacy Policy to continue.';
    setErr(e); if (Object.keys(e).length) return;
    const body = `Name: ${g('name')}\nEmail: ${g('email')}\nPhone: ${g('phone')}\nCompany: ${g('company')}\n\n${g('message')}`;
    window.location.href = `mailto:${company.infoEmail}?subject=${encodeURIComponent('Website enquiry')}&body=${encodeURIComponent(body)}`;
    setDone(true);
  };
  return (
    <form className="cform" onSubmit={submit} noValidate>
      <label>Name *<input name="name" autoComplete="name" aria-invalid={!!err.name} />{err.name && <span className="err">{err.name}</span>}</label>
      <label>Email *<input name="email" type="email" autoComplete="email" aria-invalid={!!err.email} />{err.email && <span className="err">{err.email}</span>}</label>
      <label>Phone<input name="phone" type="tel" autoComplete="tel" /></label>
      <label>Company<input name="company" autoComplete="organization" /></label>
      <label>Message *<textarea name="message" aria-invalid={!!err.message} />{err.message && <span className="err">{err.message}</span>}</label>
      <label className="chk"><input type="checkbox" name="consent" /><span>I agree to the Privacy Policy.</span></label>
      {err.consent && <span className="err">{err.consent}</span>}
      <button className="btn" type="submit" style={{ justifySelf: 'start' }}>Send enquiry</button>
      {done && <p className="ok" role="status">Your email app should open with the enquiry pre-filled. Nothing is sent until you press send there.</p>}
    </form>
  );
}
