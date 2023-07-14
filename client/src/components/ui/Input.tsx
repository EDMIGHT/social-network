import React, { useEffect, useRef } from 'react';

import { cn } from '@/utils/cn';

import Typography from './Typography';

interface InputProps {
  id?: string;
  name: string;
  error?: string;
  value?: string;
  optionals?: object;
  children?: string;
  placeholder?: string;
  className?: string;
  defaultValue?: string | undefined;
  onChange?: any;
  focus?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  name,
  error,
  optionals,
  children,
  placeholder,
  value,
  className,
  defaultValue,
  onChange,
  focus = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focus && inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focus]);

  return (
    <label htmlFor={name} className={cn('w-full cursor-pointer', className)}>
      <Typography component='h2' variant='title-1' className='pl-2'>
        {children}
      </Typography>
      <input
        ref={inputRef}
        value={value}
        placeholder={placeholder}
        defaultValue={defaultValue}
        name={name}
        id={id ?? name}
        onChange={onChange}
        {...optionals}
        className='w-full cursor-pointer rounded border-2 border-transparent bg-input p-2 transition-all hover:border-primary focus:border-primary focus:outline-none active:border-primary'
      />
      {error && (
        <Typography
          component='span'
          variant='description'
          className='pl-2 font-bold text-red-700'
        >
          {error}
        </Typography>
      )}
    </label>
  );
};

export default Input;
