import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setCurrentRole, UserRole } from '../../lib/auth';

const Login: React.FC = () => {
  const [role, setRole] = useState<UserRole>('tenant');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentRole(role);
    if (role === 'tenant') navigate('/tenant/dashboard');
    else if (role === 'landlord') navigate('/landlord/dashboard');
    else navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen pt-28 px-6 bg-obsidian text-platinum">
      <div className="max-w-md mx-auto border border-white/10 p-6 bg-graphite/30">
        <h1 className="text-3xl font-serif mb-4">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <select value={role} onChange={(e) => setRole(e.target.value as UserRole)} className="w-full p-3 bg-obsidian border border-white/20">
            <option value="tenant">Tenant</option>
            <option value="landlord">Landlord</option>
            <option value="admin">Admin</option>
            <option value="owner">Owner</option>
          </select>
          <button className="w-full bg-white text-obsidian py-3 font-bold">Continue</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
