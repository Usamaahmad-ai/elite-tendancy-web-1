import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import StatCard from '../../components/dashboard/StatCard';
import { getAdminStats } from '../../lib/platformApi';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({ moderationQueue: 0, verificationQueue: 0, newLeads: 0, activeListings: 0 });

  useEffect(() => {
    getAdminStats().then((data) => setStats({
      moderationQueue: data.moderationQueue || 0,
      verificationQueue: data.verificationQueue || 0,
      newLeads: data.newLeads || 0,
      activeListings: data.activeListings || 0
    }));
  }, []);

  return (
    <DashboardLayout
      title="Admin / Owner CMS"
      subtitle="Moderation, verification, content, and platform health in one command center."
    >
      <StatCard label="Moderation Queue" value={stats.moderationQueue} />
      <StatCard label="Verification Queue" value={stats.verificationQueue} />
      <StatCard label="New Leads" value={stats.newLeads} />
      <StatCard label="Published Listings" value={stats.activeListings} />
    </DashboardLayout>
  );
};

export default AdminDashboard;
