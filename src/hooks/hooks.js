import { useEffect, useState, useRef } from 'react';

export function useGlobalState(stateKey, defaultValue) {
  const [state, setState] = useState(defaultValue);
  const isNewSession = useRef(true);

  useEffect(() => {
    if (isNewSession.current) {
      const currentState = localStorage.getItem(stateKey);
      if (currentState) {
        setState(JSON.parse(currentState));
      } else {
        setState(defaultValue);
      }
      isNewSession.current = false;
      return;
    }
    try {
      localStorage.setItem(stateKey, JSON.stringify(state));
    } catch (error) {
      console.log(error);
    }
  }, [state, stateKey, defaultValue]);

  useEffect(() => {
    const onReceieveMessage = e => {
      const { key, newValue } = e;
      if (key === stateKey) {
        setState(JSON.parse(newValue));
      }
    };
    window.addEventListener('storage', onReceieveMessage);
    return () => window.removeEventListener('storage', onReceieveMessage);
  }, [stateKey, setState]);
  return [state, setState];
}
