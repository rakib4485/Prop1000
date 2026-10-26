/**
 * Data layer. Talks to the Node/Express API, which stores everything in MongoDB.
 * Same function names as before, so components did not need to change.
 */
import { api } from './api.js';
import { DEFAULTS } from './defaults.js';
import { merge } from './utils.js';

const listeners = new Set();
const notify = () => listeners.forEach((fn) => fn());

// Refresh subscribers every 20s while the tab is visible, so changes made by
// other people show up without a reload.
let timer = null;
const startPolling = () => {
  if (timer) return;
  timer = setInterval(() => {
    if (document.visibilityState === 'visible') notify();
  }, 20000);
};

export const subscribe = (fn) => {
  listeners.add(fn);
  startPolling();
  return () => {
    listeners.delete(fn);
    if (!listeners.size && timer) {
      clearInterval(timer);
      timer = null;
    }
  };
};

/* ---- site config ---- */
export const getConfig = async () => {
  try {
    const { data } = await api('/config');
    return merge(DEFAULTS, data);
  } catch {
    return DEFAULTS; // site still renders if the API is unreachable
  }
};

export const saveConfig = async (cfg) => {
  await api('/config', { method: 'PUT', body: { data: cfg } });
  notify();
};

export const resetConfig = async () => {
  await api('/config', { method: 'DELETE' });
  notify();
};

/* ---- waitlist leads ---- */
export const listLeads = async () => {
  try {
    const { leads } = await api('/leads');
    return leads;
  } catch {
    return [];
  }
};

export const addLead = async ({ name, email, pool, note = '' }) => {
  await api('/leads', { method: 'POST', body: { name, email, pool, note } });
  notify();
};

export const updateLead = async (id, patch) => {
  await api('/leads/' + id, { method: 'PATCH', body: patch });
  notify();
};

export const deleteLead = async (id) => {
  await api('/leads/' + id, { method: 'DELETE' });
  notify();
};
