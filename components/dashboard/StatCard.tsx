import React from 'react';

type Props = {
  label: string;
  value: string | number;
};

const StatCard: React.FC<Props> = ({ label, value }) => (
  <div className="border border-white/10 bg-graphite/30 p-5 rounded-md">
    <p className="text-white/60 text-sm uppercase tracking-wide">{label}</p>
    <p className="text-3xl mt-2 font-semibold">{value}</p>
  </div>
);

export default StatCard;
