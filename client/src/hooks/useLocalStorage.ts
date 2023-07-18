type ISetLocalStorage = (key: string, data: unknown) => void;
type IGetLocalStorage = (key: string) => string | object | null;
type IRemoveLocalStorage = (key: string) => void | null;
type IClearLocalStorage = () => void;

const useLocalStorage = (): [
  ISetLocalStorage,
  IGetLocalStorage,
  IRemoveLocalStorage,
  IClearLocalStorage
] => {
  const set = (key: string, data: unknown) => {
    if (typeof data === 'object') {
      localStorage.setItem(key, JSON.stringify(data));
    } else {
      localStorage.setItem(key, data as string);
    }
  };

  const get = (key: string) => {
    const data = localStorage.getItem(key);
    try {
      return data ? JSON.parse(data) : null;
    } catch (error) {
      return data;
    }
  };

  const remove = (key: string) => {
    try {
      return localStorage.removeItem(key);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const clear = () => {
    localStorage.clear();
  };

  return [set, get, remove, clear];
};

export default useLocalStorage;
