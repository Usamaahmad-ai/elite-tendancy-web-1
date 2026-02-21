import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import StatCard from '../../components/dashboard/StatCard';
import { getLandlordStats } from '../../lib/platformApi';

const LandlordDashboard: React.FC = () => {
  const [stats, setStats] = useState({ activeListings: 0, newLeads: 0, scheduledViewings: 0, applicationsOpen: 0 });

  useEffect(() => {
    getLandlordStats().then((data) => setStats({
      activeListings: data.activeListings || 0,
      newLeads: data.newLeads || 0,
      scheduledViewings: data.scheduledViewings || 0,
      applicationsOpen: data.applicationsOpen || 0
    }));
  }, []);

  return (
    <DashboardLayout
      title="Landlord Dashboard"
      subtitle="Manage listings, leads, viewings, and applications from one place."
    >
      <StatCard label="Active Listings" value={stats.activeListings} />
      <StatCard label="New Leads" value={stats.newLeads} />
      <StatCard label="Scheduled Viewings" value={stats.scheduledViewings} />
      <StatCard label="Open Applications" value={stats.applicationsOpen} />
    </DashboardLayout>
  );
};

export default LandlordDashboard;
