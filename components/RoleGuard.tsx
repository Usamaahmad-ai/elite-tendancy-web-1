import React from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentRole, UserRole } from '../lib/auth';

type Props = {
  allow: UserRole[];
  children: React.ReactNode;
};

const RoleGuard: React.FC<Props> = ({ allow, children }) => {
  const role = getCurrentRole();
  if (!role) return <Navigate to="/auth/login" replace />;
  if (!allow.includes(role)) return <Navigate to="/" replace />;
  return <>{children}</>;
};

export default RoleGuard;
