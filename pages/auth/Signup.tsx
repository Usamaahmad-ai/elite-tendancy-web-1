import React from 'react';
import { Link } from 'react-router-dom';

const Signup: React.FC = () => (
  <div className="min-h-screen pt-28 px-6 bg-obsidian text-platinum">
    <div className="max-w-md mx-auto border border-white/10 p-6 bg-graphite/30">
      <h1 className="text-3xl font-serif mb-4">Create Account</h1>
      <p className="text-white/70 mb-4">Signup flow will be connected to Supabase Auth in Day 3.</p>
      <Link to="/auth/login" className="underline">Go to login</Link>
    </div>
  </div>
);

export default Signup;
