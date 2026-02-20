import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { submitInquiry } from '../lib/submitInquiry';

type Props = { sourcePage: string };

const LeadForm: React.FC<Props> = ({ sourcePage }) => {
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', interest: 'Property Management', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorText, setErrorText] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorText('');
    try {
      await submitInquiry({ ...form, source_page: sourcePage });
      setStatus('success');
      setForm({ first_name: '', last_name: '', email: '', interest: 'Property Management', message: '' });
    } catch (err: any) {
      setStatus('error');
      setErrorText(err?.message || 'Failed to submit. Please try again.');
    }
  };

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest text-gold/80 font-bold">First Name</label>
          <input name="first_name" required value={form.first_name} onChange={onChange} type="text" className="w-full bg-obsidian/50 border-b border-white/10 py-3 text-white focus:border-gold transition-colors outline-none placeholder-white/10 hover:border-white/30" placeholder="John" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest text-gold/80 font-bold">Last Name</label>
          <input name="last_name" required value={form.last_name} onChange={onChange} type="text" className="w-full bg-obsidian/50 border-b border-white/10 py-3 text-white focus:border-gold transition-colors outline-none placeholder-white/10 hover:border-white/30" placeholder="Doe" />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-[10px] uppercase tracking-widest text-gold/80 font-bold">Email Address</label>
        <input name="email" required value={form.email} onChange={onChange} type="email" className="w-full bg-obsidian/50 border-b border-white/10 py-3 text-white focus:border-gold transition-colors outline-none placeholder-white/10 hover:border-white/30" placeholder="john@example.com" />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] uppercase tracking-widest text-gold/80 font-bold">Interest</label>
        <select name="interest" value={form.interest} onChange={onChange} className="w-full bg-obsidian/50 border-b border-white/10 py-3 text-white focus:border-gold transition-colors outline-none cursor-pointer">
          <option className="bg-obsidian">Property Management</option>
          <option className="bg-obsidian">Tenant Application</option>
          <option className="bg-obsidian">Investment Opportunities</option>
        </select>
      </div>
      <div className="space-y-2 pt-4">
        <label className="text-[10px] uppercase tracking-widest text-gold/80 font-bold">Message</label>
        <textarea name="message" required value={form.message} onChange={onChange} rows={3} className="w-full bg-obsidian/50 border-b border-white/10 py-3 text-white focus:border-gold transition-colors outline-none placeholder-white/10 resize-none hover:border-white/30" placeholder="Tell us about your needs..."></textarea>
      </div>

      <button disabled={status === 'loading'} type="submit" className="w-full bg-white text-obsidian py-4 mt-8 font-bold uppercase tracking-widest hover:bg-gold transition-all duration-500 flex items-center justify-center gap-2 group disabled:opacity-70">
        {status === 'loading' ? 'Submitting...' : 'Request Consultation'}
        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </button>

      {status === 'success' && <p className="text-emerald-300 text-sm">Thanks — your request was sent.</p>}
      {status === 'error' && <p className="text-rose-300 text-sm">{errorText}</p>}
    </form>
  );
};

export default LeadForm;
