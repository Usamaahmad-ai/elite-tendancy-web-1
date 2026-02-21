import React from 'react';

type Props = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

const DashboardLayout: React.FC<Props> = ({ title, subtitle, children }) => (
  <div className="min-h-screen pt-24 px-6 bg-obsidian text-platinum">
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-serif">{title}</h1>
      <p className="text-white/65 mt-2">{subtitle}</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">{children}</div>
    </div>
  </div>
);

export default DashboardLayout;
