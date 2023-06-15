import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Typography from '@/components/ui/Typography';
import useLocalStorage from '@/hooks/useLocalStorage';
import { ILoginQuery, useLoginMutation } from '@/store/api/auth.api';
import { setUserData } from '@/store/slices/user.slice';

export interface ILoginForm {
  login: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [setLocalStorage] = useLocalStorage();
  const [isLoginError, SetLoginError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();

  const [login, { isLoading, isError, isSuccess }] = useLoginMutation();

  const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
    const response = (await login(data)) as ILoginQuery; // ? idk как типизировать ответ ртк правильно

    if (response.error?.data.message) {
      SetLoginError(response.error.data.message);
    }

    if (response.data) {
      dispatch(setUserData(response.data));

      setLocalStorage('accessToken', response.data.accessToken);
      setLocalStorage('refreshToken', response.data.refreshToken);

      navigate('/');
    }
  };

  // if (isLoading) return <div>loading</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
      <Input
        placeholder='enter login...'
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
        placeholder='enter password...'
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
      {isLoginError && (
        <Typography
          component='span'
          variant='title-3'
          className='pl-2 text-center font-bold text-red-700'
        >
          {isLoginError}
        </Typography>
      )}
      <Button type='submit' variant='activity' className='hover:contrast-125'>
        sign In
      </Button>
    </form>
  );
};

export default LoginForm;
