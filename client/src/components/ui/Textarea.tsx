import React from 'react';

import { cn } from '@/utils/cn';

import Typography from './Typography';

interface TextareaProps {
  id?: string;
  name: string;
  error?: string;
  optionals?: object;
  children?: string;
  placeholder?: string;
  className?: string;
  defaultValue?: string | undefined;
}

const Textarea: React.FC<TextareaProps> = ({
  id,
  name,
  error,
  optionals,
  children,
  placeholder,
  className,
  defaultValue,
}) => {
  return (
    <label htmlFor={name} className={cn('w-full cursor-pointer', className)}>
      <Typography component='h2' variant='title-1' className='pl-2'>
        {children}
      </Typography>
      <textarea
        {...optionals}
        placeholder={placeholder}
        defaultValue={defaultValue}
        name={name}
        id={id ?? name}
        className='h-36 w-full cursor-pointer resize-none overflow-hidden break-words rounded border-2 border-transparent bg-input p-2 transition-all hover:border-primary focus:border-primary focus:outline-none active:border-primary'
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

export default Textarea;
