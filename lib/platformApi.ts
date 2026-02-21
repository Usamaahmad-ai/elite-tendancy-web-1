export type DashboardStats = {
  activeListings?: number;
  newLeads?: number;
  scheduledViewings?: number;
  applicationsOpen?: number;
  savedListings?: number;
  profileCompletion?: number;
  moderationQueue?: number;
  verificationQueue?: number;
};

const mock = {
  landlord: {
    activeListings: 6,
    newLeads: 14,
    scheduledViewings: 5,
    applicationsOpen: 3
  },
  tenant: {
    savedListings: 18,
    scheduledViewings: 2,
    applicationsOpen: 1,
    profileCompletion: 72
  },
  admin: {
    moderationQueue: 9,
    verificationQueue: 4,
    newLeads: 27,
    activeListings: 83
  }
};

export async function getLandlordStats(): Promise<DashboardStats> {
  return Promise.resolve(mock.landlord);
}

export async function getTenantStats(): Promise<DashboardStats> {
  return Promise.resolve(mock.tenant);
}

export async function getAdminStats(): Promise<DashboardStats> {
  return Promise.resolve(mock.admin);
}
