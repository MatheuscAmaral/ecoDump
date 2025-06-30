/**
 * Authentication utility functions
 */

/**
 * User interface based on the API response
 */
export interface User {
  id: number;
  username: string;
  level: string;
  status: boolean;
}

/**
 * Logout function that clears user data
 * Note: Redirect should be handled by the component using useNavigate
 */
export const logout = (): void => {
  // Clear user data from localStorage
  localStorage.removeItem('user');
};

/**
 * Simple logout with redirect (fallback method)
 */
export const logoutWithRedirect = (): void => {
  // Clear user data from localStorage
  localStorage.removeItem('user');
  
  // Redirect to sign-in page
  window.location.href = '/sign-in';
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  const user = localStorage.getItem('user');
  return user !== null;
};

/**
 * Get current user data
 */
export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

/**
 * Check if current user has admin level
 */
export const isAdmin = (): boolean => {
  const user = getCurrentUser();
  return user?.level === 'admin';
};

/**
 * Check if current user has specific level
 */
export const hasLevel = (level: string): boolean => {
  const user = getCurrentUser();
  return user?.level === level;
};

/**
 * Check if current user has any of the specified levels
 */
export const hasAnyLevel = (levels: string[]): boolean => {
  const user = getCurrentUser();
  return user ? levels.includes(user.level) : false;
};
