'use client';
import { useState } from 'react';

/** Preview-only form: validates, never submits anywhere (no backend is connected). */
export function ConceptForm({ prefix, title }: { prefix: string; title: string }) {
  const [state, setState] = useState<'idle' | 'error' | 'ok'>('idle');
  const f = (n: string) => `${prefix}-${n}`;
  return (
    <form className={`${prefix}-form`} noValidate onSubmit={(e) => { e.preventDefault(); setState((e.currentTarget as HTMLFormElement).checkValidity() ? 'ok' : 'error'); }}>
      <h3 className={`${prefix}-form__t`}>{title}</h3>
      <div className={`${prefix}-form__grid`}>
        <label htmlFor={f('name')}>Name<input id={f('name')} name="name" required autoComplete="name" /></label>
        <label htmlFor={f('email')}>Email<input id={f('email')} name="email" type="email" required autoComplete="email" /></label>
        <label htmlFor={f('phone')}>Phone<input id={f('phone')} name="phone" type="tel" autoComplete="tel" /></label>
        <label htmlFor={f('company')}>Company<input id={f('company')} name="company" autoComplete="organization" /></label>
        <label htmlFor={f('msg')} className={`${prefix}-form__wide`}>How can we help?<textarea id={f('msg')} name="message" rows={3} /></label>
      </div>
      <button type="submit" className={`${prefix}-form__go`}>Request a quote</button>
      <p role="status" className={`${prefix}-form__note`}>
        {state === 'error' && 'Please add your name and a valid email.'}
        {state === 'ok' && 'Design preview: the form is not connected to a backend yet.'}
      </p>
    </form>
  );
}
