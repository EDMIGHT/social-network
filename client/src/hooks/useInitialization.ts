import { useEffect } from 'react';

import useAuthentication from './useAuthentication';
import useLocalStorage from './useLocalStorage';
import useTheme from './useTheme';

export const useInitialization = () => {
  useAuthentication();

  const [, getLocal] = useLocalStorage();
  const [, , setTheme] = useTheme();

  useEffect(() => {
    const prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = getLocal('theme') as 'dark' | 'light';
    if (theme) {
      setTheme(theme);
    } else if (prefersDarkTheme) {
      setTheme('dark');
    }
  }, []);
};
