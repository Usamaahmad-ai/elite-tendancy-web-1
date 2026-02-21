import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import StatCard from '../../components/dashboard/StatCard';
import { getTenantStats } from '../../lib/platformApi';

const TenantDashboard: React.FC = () => {
  const [stats, setStats] = useState({ savedListings: 0, scheduledViewings: 0, applicationsOpen: 0, profileCompletion: 0 });

  useEffect(() => {
    getTenantStats().then((data) => setStats({
      savedListings: data.savedListings || 0,
      scheduledViewings: data.scheduledViewings || 0,
      applicationsOpen: data.applicationsOpen || 0,
      profileCompletion: data.profileCompletion || 0
    }));
  }, []);

  return (
    <DashboardLayout
      title="Tenant Dashboard"
      subtitle="Track saved homes, viewings, and applications in one timeline."
    >
      <StatCard label="Saved Listings" value={stats.savedListings} />
      <StatCard label="Upcoming Viewings" value={stats.scheduledViewings} />
      <StatCard label="Open Applications" value={stats.applicationsOpen} />
      <StatCard label="Profile Completion" value={`${stats.profileCompletion}%`} />
    </DashboardLayout>
  );
};

export default TenantDashboard;
