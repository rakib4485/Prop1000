import { api } from './api.js';

export const isAdmin = async () => {
  try {
    await api('/auth/me');
    return true;
  } catch {
    return false;
  }
};

// Returns '' on success, otherwise an error message to show.
export const login = async (email, password) => {
  try {
    await api('/auth/login', { method: 'POST', body: { email, password } });
    return '';
  } catch (e) {
    return e.status === 429 ? 'Too many attempts. Try again in 15 minutes.' : e.message || 'Sign in failed.';
  }
};

export const logout = () => api('/auth/logout', { method: 'POST' }).catch(() => {});
