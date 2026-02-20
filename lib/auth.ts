export type UserRole = 'tenant' | 'landlord' | 'admin' | 'owner';

const ROLE_KEY = 'elite_role';

export function getCurrentRole(): UserRole | null {
  const value = localStorage.getItem(ROLE_KEY);
  if (value === 'tenant' || value === 'landlord' || value === 'admin' || value === 'owner') return value;
  return null;
}

export function setCurrentRole(role: UserRole) {
  localStorage.setItem(ROLE_KEY, role);
}

export function clearCurrentRole() {
  localStorage.removeItem(ROLE_KEY);
}
