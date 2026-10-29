import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Panel } from './Common';

const EMPTY = { name: '', email: '', message: '', company: '' };

const inputClass =
  'w-full rounded-lg border border-line/10 bg-ink-950/60 px-3.5 py-2.5 text-sm text-fg-100 placeholder-fg-600 outline-none transition focus:border-accent/60 focus:ring-2 focus:ring-accent/20';

// Contact form: inserts into public.messages (visitors can write but never read).
export default function ContactForm({ text }) {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [errorDetail, setErrorDetail] = useState(null);

  const update = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    // Honeypot: bots fill the hidden "company" field; pretend success and drop it
    if (form.company) {
      setStatus('sent');
      return;
    }
    setStatus('sending');
    setErrorDetail(null);
    const { error } = await supabase
      .from('messages')
      .insert({ name: form.name.trim(), email: form.email.trim(), message: form.message.trim() });
    if (error) {
      setErrorDetail(error.code === 'P0001' ? error.message : null);
      setStatus('error');
      return;
    }
    setForm(EMPTY);
    setStatus('sent');
  };

  return (
    <Panel title={text['contact.form_title']} hover={false} className="h-full" bodyClassName="p-5 sm:p-6">
      {status === 'sent' ? (
        <div className="flex flex-col items-start gap-4 py-6" role="status">
          <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-ok">
            <span className="status-dot" /> 200 OK
          </span>
          <p className="text-base text-fg-200">{text['contact.form_success']}</p>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="text-sm font-semibold text-accent-300 hover:text-accent-200"
          >
            ← {text['contact.form_title']}
          </button>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-fg-400">{text['contact.form_name']}</span>
              <input required maxLength={100} autoComplete="name" value={form.name} onChange={update('name')} className={inputClass} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-fg-400">{text['contact.form_email']}</span>
              <input required type="email" maxLength={200} autoComplete="email" value={form.email} onChange={update('email')} className={inputClass} />
            </label>
          </div>
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-fg-400">{text['contact.form_message']}</span>
            <textarea required rows={5} maxLength={5000} value={form.message} onChange={update('message')} className={`${inputClass} resize-y`} />
          </label>

          {/* Honeypot, hidden from people and assistive tech */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={form.company}
            onChange={update('company')}
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />

          {status === 'error' && (
            <p className="rounded-lg border border-accent2/30 bg-accent2/10 px-3.5 py-2.5 text-sm text-accent2-200" role="alert">
              {errorDetail || text['contact.form_error']}
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent shadow-glow transition-colors hover:bg-accent-300 disabled:opacity-60 sm:w-auto"
          >
            {status === 'sending' && <span className="h-4 w-4 animate-spin rounded-full border-2 border-on-accent/30 border-t-on-accent" />}
            {text['contact.form_submit']}
          </button>
        </form>
      )}
    </Panel>
  );
}
