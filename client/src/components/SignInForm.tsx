import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import PasswordInput from '@/components/PasswordInput';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Typography from '@/components/ui/Typography';
import { useAppDispatch } from '@/hooks/reduxHooks';
import useLocalStorage from '@/hooks/useLocalStorage';
import { IAuthQuery, useLoginMutation } from '@/services/auth.service';
import { setUserData } from '@/store/slices/user.slice';
import { isErrorWithMessage } from '@/types/responses.types';

export interface ISignInForm {
  login: string;
  password: string;
}

const SignInForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [setLocalStorage] = useLocalStorage();
  const [isLoginError, SetLoginError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInForm>();

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit: SubmitHandler<ISignInForm> = async (data) => {
    const response = (await login(data)) as IAuthQuery;

    if (isErrorWithMessage(response)) {
      SetLoginError(response.error.data.message);
    }

    if (response.data) {
      dispatch(setUserData(response.data));

      setLocalStorage('accessToken', response.data.accessToken);
      setLocalStorage('refreshToken', response.data.refreshToken);

      navigate('/');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
      <Input
        placeholder='enter login...'
        name='login'
        required
        optionals={{
          ...register('login', {
            required: 'login is a required field',
            minLength: {
              value: 2,
              message: 'the minimum login length is 2 characters',
            },
            maxLength: {
              value: 100,
              message: 'the maximum login length is 100 characters',
            },
          }),
        }}
        error={errors.login ? errors.login.message : undefined}
      >
        login
      </Input>
      <PasswordInput
        optionals={{
          ...register('password', {
            required: 'password is a required field',
            minLength: {
              value: 5,
              message: 'the minimum password length is 5 characters',
            },
            maxLength: {
              value: 100,
              message: 'the maximum password length is 100 characters',
            },
          }),
        }}
        error={errors.password ? errors.password.message : undefined}
      >
        password
      </PasswordInput>
      {isLoginError && (
        <Typography
          component='span'
          variant='title-3'
          className='pl-2 text-center font-bold text-red-700'
        >
          {isLoginError}
        </Typography>
      )}
      <Button
        disabled={isLoading}
        type='submit'
        variant='activity'
        className='hover:contrast-125'
      >
        sign In
      </Button>
    </form>
  );
};

export default SignInForm;
