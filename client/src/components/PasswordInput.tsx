import React, { ReactNode, useEffect, useRef, useState } from 'react';

import Typography from '@/components/ui/Typography';
import { cn } from '@/utils/cn';

interface PasswordInputProps {
  id?: string;
  name?: string;
  error?: string;
  value?: string;
  optionals?: object;
  children?: ReactNode;
  placeholder?: string;
  className?: string;
  defaultValue?: string | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  focus?: boolean;
  required?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  name = 'password',
  error,
  optionals,
  children,
  placeholder = 'enter password...',
  value,
  className,
  defaultValue,
  onChange,
  focus = false,
  required = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (focus && inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focus]);

  return (
    <label htmlFor={id ?? name} className={cn('w-full cursor-pointer', className)}>
      <Typography component='h2' variant='title-1' className='pl-2'>
        {children}
        {required && <span className='pl-1 font-bold text-red-700'>*</span>}
      </Typography>
      <div className='relative'>
        <input
          ref={inputRef}
          value={value}
          placeholder={placeholder}
          defaultValue={defaultValue}
          name={name}
          id={id ?? name}
          onChange={onChange}
          type={showPassword ? 'text' : 'password'}
          {...optionals}
          className='w-full cursor-pointer rounded border-2 border-transparent bg-input p-2 pr-10 transition-all hover:border-primary focus:border-primary focus:outline-none active:border-primary'
        />
        <button
          type='button'
          onClick={() => setShowPassword((prev) => !prev)}
          className='absolute right-0 top-0 h-full px-2 py-1 opacity-70 hover:opacity-100'
        >
          {showPassword ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-4 w-4'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
              />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-4 w-4'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
              />
            </svg>
          )}
        </button>
      </div>
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

export default PasswordInput;
