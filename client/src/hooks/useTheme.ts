import { useEffect } from 'react';

import { setTheme } from '@/store/slices/settings.slice';

import { useAppDispatch, useAppSelector } from './reduxHooks';
import useLocalStorage from './useLocalStorage';

const useTheme = (): [string, () => void, (newTheme: 'dark' | 'light') => void] => {
  const { theme } = useAppSelector((state) => state.settings);
  const [setLocal] = useLocalStorage();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setLocal('theme', theme);
  }, [theme]);

  const setThemeLocal = (newTheme: 'dark' | 'light') => {
    document.documentElement.classList.add(newTheme);
  };

  const toggleTheme = () => {
    const toggledTheme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(toggledTheme);
    dispatch(setTheme(toggledTheme));
  };

  return [theme, toggleTheme, setThemeLocal];
};

export default useTheme;
