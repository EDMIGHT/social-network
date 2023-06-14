import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button from '@/components/ui/Button';

import Input from '../ui/Input';

interface ILoginForm {
  login: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();

  const onSubmit: SubmitHandler<ILoginForm> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
      <Input
        name='login'
        optionals={{
          ...register('login', {
            required: 'login is a required field',
            minLength: {
              value: 2,
              message: 'the minimum login length is 2 characters',
            },
          }),
        }}
        error={errors.login ? errors.login.message : undefined}
      >
        login
      </Input>
      <Input
        name='password'
        optionals={{
          ...register('password', {
            required: 'password is a required field',
            minLength: {
              value: 5,
              message: 'the minimum password length is 5 characters',
            },
          }),
        }}
        error={errors.password ? errors.password.message : undefined}
      >
        password
      </Input>

      <Button type='submit' variant='activity' className='hover:contrast-125'>
        sign In
      </Button>
    </form>
  );
};

export default LoginForm;
