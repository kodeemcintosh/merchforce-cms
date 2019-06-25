import react, { useState, useEffect } from 'react';

export function useLocalStorage(key, defaultValue) {
  const [ state, setState ] = useState(async () => {
    let value;
    try {
      value = JSON.parse(
        window.localStorage.getItem(key) || String(defaultValue)
      );
    } catch(err) {
      value = defaultValue;
    }
    return value;
  });

  useEffect(async () => {
    window.localStorage.setItem(key, state);
  }, [state]);

  return [ state, setState ];
}