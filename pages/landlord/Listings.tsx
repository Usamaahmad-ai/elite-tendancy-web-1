import React from 'react';
import { Link } from 'react-router-dom';

const Listings: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 px-6 bg-obsidian text-platinum">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-serif">My Listings</h1>
          <Link to="/landlord/listings/new" className="bg-white text-obsidian px-4 py-2 font-semibold">+ New Listing</Link>
        </div>
        <p className="text-white/65 mt-2">Listing manager scaffold is live. CRUD wiring comes next milestone.</p>
      </div>
    </div>
  );
};

export default Listings;
