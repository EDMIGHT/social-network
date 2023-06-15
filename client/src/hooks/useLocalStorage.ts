type ISetLocalStorage = (key: string, data: unknown) => void;
type IGetLocalStorage = (key: string) => string | object | null;
type IClearLocalStorage = () => void;

const useLocalStorage = (): [ISetLocalStorage, IGetLocalStorage, IClearLocalStorage] => {
  const setLocalStorage = (key: string, data: unknown) => {
    if (typeof data === 'object') {
      localStorage.setItem(key, JSON.stringify(data));
    } else {
      localStorage.setItem(key, data as string);
    }
  };

  const getLocalStorage = (key: string) => {
    const data = localStorage.getItem(key);
    try {
      return data ? JSON.parse(data) : null;
    } catch (error) {
      return data;
    }
  };

  const clearLocalStorage = () => {
    localStorage.clear();
  };

  return [setLocalStorage, getLocalStorage, clearLocalStorage];
};

export default useLocalStorage;
