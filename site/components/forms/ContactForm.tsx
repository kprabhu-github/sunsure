'use client';
import { useId, useState, type FormEvent } from 'react';
import { company } from '@/content/site';
import { AppLink } from '@/components/ui/AppLink';
import './form.css';

type Values = { name: string; email: string; phone: string; company: string; message: string; consent: boolean };
const empty: Values = { name: '', email: '', phone: '', company: '', message: '', consent: false };

/**
 * Frontend-only contact form. The live site's form shows "Contact form not found", so no backend is known and none is invented.
 * On a valid submit it opens a pre-filled email to the published address. Swap `onValid` for a server route once an endpoint is confirmed.
 */
export function ContactForm({ heading = 'Reach out to get a free quote' }: { heading?: string }) {
  const uid = useId();
  const [v, setV] = useState<Values>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [done, setDone] = useState(false);

  const set = <K extends keyof Values>(k: K, val: Values[K]) => setV((s) => ({ ...s, [k]: val }));

  const validate = () => {
    const e: Partial<Record<keyof Values, string>> = {};
    if (!v.name.trim()) e.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'Please enter a valid email address.';
    if (v.phone && !/^[+\d][\d\s()-]{6,}$/.test(v.phone)) e.phone = 'Please enter a valid phone number.';
    if (!v.message.trim()) e.message = 'Please tell us how we can help.';
    if (!v.consent) e.consent = 'Please agree to the Privacy Policy to continue.';
    return e;
  };

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) { document.getElementById(`${uid}-${Object.keys(e)[0]}`)?.focus(); return; }
    const body = `Name: ${v.name}\nEmail: ${v.email}\nPhone: ${v.phone}\nCompany: ${v.company}\n\n${v.message}`;
    window.location.href = `mailto:${company.infoEmail}?subject=${encodeURIComponent('Website enquiry')}&body=${encodeURIComponent(body)}`;
    setDone(true);
  };

  const field = (k: keyof Omit<Values, 'consent'>, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}, area = false) => {
    const id = `${uid}-${k}`; const err = errors[k];
    const common = { id, name: k, value: v[k], 'aria-invalid': !!err, 'aria-describedby': err ? `${id}-e` : undefined, onChange: (e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => set(k, e.target.value) };
    return (
      <div className={`cf__f ${err ? 'has-err' : ''}`}>
        <label htmlFor={id}>{label}{['name', 'email', 'message'].includes(k) && <span aria-hidden="true"> *</span>}</label>
        {area ? <textarea rows={4} {...common} /> : <input {...common} {...props} />}
        {err && <p id={`${id}-e`} className="cf__e">{err}</p>}
      </div>
    );
  };

  return (
    <form className="cf" onSubmit={onSubmit} noValidate aria-labelledby={`${uid}-h`}>
      <h2 id={`${uid}-h`} className="cf__h">{heading}</h2>
      {field('name', 'Name', { autoComplete: 'name' })}
      <div className="cf__two">
        {field('email', 'Email', { type: 'email', autoComplete: 'email' })}
        {field('phone', 'Phone', { type: 'tel', autoComplete: 'tel' })}
      </div>
      {field('company', 'Company', { autoComplete: 'organization' })}
      {field('message', 'Message', {}, true)}
      <div className={`cf__c ${errors.consent ? 'has-err' : ''}`}>
        <input id={`${uid}-consent`} type="checkbox" checked={v.consent} onChange={(e) => set('consent', e.target.checked)} aria-invalid={!!errors.consent} aria-describedby={errors.consent ? `${uid}-consent-e` : undefined} />
        <label htmlFor={`${uid}-consent`}>I agree to the <AppLink href="/privacy-policy/">Privacy Policy</AppLink>.</label>
        {errors.consent && <p id={`${uid}-consent-e`} className="cf__e">{errors.consent}</p>}
      </div>
      <button type="submit" className="btn btn--primary cf__submit"><span>Send enquiry</span></button>
      <p className="cf__status" role="status" aria-live="polite">
        {done ? `Your email app should open with your message to ${company.infoEmail}. If it does not, write to us directly at that address or call ${company.phone}.` : ''}
      </p>
      <p className="cf__note">This form is not yet connected to a server; submitting prepares an email to {company.infoEmail}.</p>
    </form>
  );
}
