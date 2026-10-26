import { useEffect, useState } from 'react';
import { DEFAULTS } from './defaults.js';
import { getConfig, listLeads, subscribe } from './store.js';

export function useConfig() {
  const [cfg, setCfg] = useState(DEFAULTS);
  useEffect(() => {
    let live = true;
    const load = () => getConfig().then((c) => live && setCfg(c));
    load();
    const off = subscribe(load);
    return () => {
      live = false;
      off();
    };
  }, []);
  return cfg;
}

export function useLeads() {
  const [leads, setLeads] = useState(null); // null = loading
  useEffect(() => {
    let live = true;
    const load = () => listLeads().then((l) => live && setLeads(l));
    load();
    const off = subscribe(load);
    return () => {
      live = false;
      off();
    };
  }, []);
  return leads;
}
