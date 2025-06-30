import { ReactNode } from 'react';
import { getCurrentUser, hasLevel, hasAnyLevel } from '@/utils/auth';

interface RoleBasedAccessProps {
  children: ReactNode;
  requiredLevel?: string;
  requiredLevels?: string[];
  fallback?: ReactNode;
}

/**
 * Role-based access control component
 * Shows children only if user has required level(s)
 */
export const RoleBasedAccess = ({
  children,
  requiredLevel,
  requiredLevels,
  fallback = null
}: RoleBasedAccessProps) => {
  const user = getCurrentUser();

  // If no user is logged in, don't show anything
  if (!user) {
    return <>{fallback}</>;
  }

  // Check single level requirement
  if (requiredLevel && !hasLevel(requiredLevel)) {
    return <>{fallback}</>;
  }

  // Check multiple levels requirement
  if (requiredLevels && !hasAnyLevel(requiredLevels)) {
    return <>{fallback}</>;
  }

  // User has required permissions, show children
  return <>{children}</>;
};
