import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

export const getStoredAdminToken = () => {
  if (typeof window === 'undefined') {
    return '';
  }

  return window.localStorage.getItem('blogAdminToken') || '';
};

export const saveAdminToken = (token) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem('blogAdminToken', token);
};

export const clearAdminToken = () => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem('blogAdminToken');
};

export const getAdminHeaders = () => {
  const token = getStoredAdminToken() || import.meta.env.VITE_ADMIN_TOKEN || '';

  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
};

export default api;
