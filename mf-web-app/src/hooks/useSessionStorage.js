import react, { useState, useEffect } from 'react';

export function useSessionStorage(key, defaultValue) {
  const [ state, setState ] = useState(async () => {
    let value;
    try {
      value = JSON.parse(
        window.sessionStorage.getItem(key) || String(defaultValue)
      );
    } catch(err) {
      value = defaultValue;
    }
    return value;
  });

  useEffect(async () => {
    window.sessionStorage.setItem(key, state);
  }, [state]);

  return [ state, setState ];
}