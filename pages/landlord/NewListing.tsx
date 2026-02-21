import React, { useState } from 'react';

const NewListing: React.FC = () => {
  const [form, setForm] = useState({ title: '', city: '', price: '', beds: 1, baths: 1, description: '' });

  return (
    <div className="min-h-screen pt-24 px-6 bg-obsidian text-platinum">
      <div className="max-w-3xl mx-auto border border-white/10 bg-graphite/20 p-6">
        <h1 className="text-3xl font-serif mb-4">Create New Listing</h1>
        <div className="grid md:grid-cols-2 gap-3">
          <input className="p-3 bg-obsidian border border-white/20" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input className="p-3 bg-obsidian border border-white/20" placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
          <input className="p-3 bg-obsidian border border-white/20" placeholder="Price per month" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          <input className="p-3 bg-obsidian border border-white/20" type="number" placeholder="Beds" value={form.beds} onChange={(e) => setForm({ ...form, beds: Number(e.target.value) })} />
          <input className="p-3 bg-obsidian border border-white/20" type="number" placeholder="Baths" value={form.baths} onChange={(e) => setForm({ ...form, baths: Number(e.target.value) })} />
        </div>
        <textarea className="mt-3 w-full p-3 bg-obsidian border border-white/20" rows={5} placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <button className="mt-4 bg-white text-obsidian px-5 py-2 font-semibold">Save Draft (UI)</button>
      </div>
    </div>
  );
};

export default NewListing;
