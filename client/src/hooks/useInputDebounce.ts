import debounce from 'lodash.debounce';
import { ChangeEvent, useCallback, useState } from 'react';

interface IUseInputDebounceArg {
  debounceTime?: number;
  callback: (arg: string) => void;
}

type IUseInputDebounceResult = [
  string,
  (e: ChangeEvent<HTMLInputElement>) => void,
  (arg: string) => void
];

export const useInputDebounce = ({
  debounceTime = 200,
  callback,
}: IUseInputDebounceArg): IUseInputDebounceResult => {
  const [localText, setLocalText] = useState('');

  const debounceUpdateSearchValue = useCallback(
    debounce(async (inputText: string) => {
      if (inputText) {
        await callback(inputText);
      }
    }, debounceTime),
    []
  );

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalText(e.target.value ?? '');
    debounceUpdateSearchValue(e.target.value);
  };

  return [localText, onChangeInput, setLocalText];
};
