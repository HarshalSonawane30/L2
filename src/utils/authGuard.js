export const isAuthenticated = () => {
  try {
    return typeof window !== 'undefined' && localStorage.getItem('isAuthenticated') === 'true';
  } catch {
    return false;
  }
};

export const requireAuth = (navigate, intent = null, extras = {}) => {
  if (!isAuthenticated()) {
    navigate('/login', { state: { from: window.location.pathname, intent, ...extras } });
    return false;
  }
  return true;
};
