import React from 'react';

type Props = {
  query: string;
  setQuery: (v: string) => void;
  type: string;
  setType: (v: string) => void;
  minPrice: number;
  setMinPrice: (v: number) => void;
  maxPrice: number;
  setMaxPrice: (v: number) => void;
  beds: number;
  setBeds: (v: number) => void;
  types: string[];
};

const FilterBar: React.FC<Props> = ({ query, setQuery, type, setType, minPrice, setMinPrice, maxPrice, setMaxPrice, beds, setBeds, types }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-3 mt-10">
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search city, area, title" className="lg:col-span-2 px-4 py-3 bg-obsidian border border-white/20 text-white" />
      <select value={type} onChange={(e) => setType(e.target.value)} className="px-4 py-3 bg-obsidian border border-white/20 text-white">
        {types.map((t) => <option key={t} value={t}>{t}</option>)}
      </select>
      <input type="number" value={minPrice} onChange={(e) => setMinPrice(Number(e.target.value || 0))} placeholder="Min £/mo" className="px-4 py-3 bg-obsidian border border-white/20 text-white" />
      <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value || 0))} placeholder="Max £/mo" className="px-4 py-3 bg-obsidian border border-white/20 text-white" />
      <select value={beds} onChange={(e) => setBeds(Number(e.target.value))} className="px-4 py-3 bg-obsidian border border-white/20 text-white">
        <option value={0}>Any Beds</option>
        <option value={1}>1+ Beds</option>
        <option value={2}>2+ Beds</option>
        <option value={3}>3+ Beds</option>
        <option value={4}>4+ Beds</option>
      </select>
    </div>
  );
};

export default FilterBar;
