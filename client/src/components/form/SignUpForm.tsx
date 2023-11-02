import { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import PasswordInput from '@/components/PasswordInput';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Thumbnail from '@/components/ui/Thumbnail';
import Typography from '@/components/ui/Typography';
import UploadPhoto from '@/components/UploadPhoto';
import { useAppDispatch } from '@/hooks/reduxHooks';
import useLocalStorage from '@/hooks/useLocalStorage';
import { IAuthQuery, useRegisterMutation } from '@/services/auth.service';
import { setUserData } from '@/store/slices/user.slice';
import { isErrorWithMessage } from '@/types/responses.types';
import { generateImgByLogin } from '@/utils/generateImgByLogin';

export interface ISignUpForm {
  name?: string;
  email?: string;
  login: string;
  password: string;
  img?: string;
}

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const defaultImg = generateImgByLogin();

const SignUpForm: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [setLocalStorage] = useLocalStorage();
  const [errorMessage, SetErrorMessage] = useState<string | null>(null);
  const [imgURL, setImgURL] = useState<string>(defaultImg);
  const [uploadedImgURL, setUploadedImgURL] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ISignUpForm>({
    defaultValues: {
      email: '',
      login: '',
      name: '',
      password: '',
    },
  });

  const loginValue = watch('login');

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!uploadedImgURL) {
        const newImgURL = generateImgByLogin(loginValue);
        setImgURL(newImgURL);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [loginValue, uploadedImgURL]);

  const [registerReq, { isLoading }] = useRegisterMutation();

  const onSubmit: SubmitHandler<ISignUpForm> = async ({ login, password, email, name }) => {
    const response = (await registerReq({
      login,
      password,
      email: email || undefined,
      name: name || undefined,
      img: uploadedImgURL || undefined,
    })) as IAuthQuery;

    if (isErrorWithMessage(response)) {
      SetErrorMessage(response.error.data.message);
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
      <div className='flex items-center justify-center'>
        <UploadPhoto
          onChangeFile={(uploadedImg) => {
            if (uploadedImg) {
              setUploadedImgURL(uploadedImg);
            } else {
              SetErrorMessage('Failed to convert image');
            }
          }}
          className='h-[100px] w-[100px]'
        >
          <div className='group relative'>
            <Thumbnail
              imgURL={uploadedImgURL || imgURL}
              alt='me'
              className=' transition group-hover:brightness-75'
            />
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='#fff'
              className='absolute left-1/2 top-1/2 z-20 h-10 w-10 -translate-x-1/2 -translate-y-1/2 opacity-0  transition-all group-hover:opacity-100'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z'
              />
            </svg>
          </div>
        </UploadPhoto>
      </div>
      <Input
        placeholder='enter name...'
        name='name'
        optionals={{
          ...register('name', {
            maxLength: {
              value: 100,
              message: 'the maximum name length is 100 characters',
            },
          }),
        }}
        error={errors.name ? errors.name.message : undefined}
      >
        name
      </Input>
      <Input
        placeholder='enter email...'
        name='email'
        optionals={{
          ...register('email', {
            maxLength: {
              value: 100,
              message: 'the maximum email length is 100 characters',
            },
            pattern: {
              value: emailRegex,
              message: 'you entered the wrong email',
            },
          }),
        }}
        error={errors.email ? errors.email.message : undefined}
      >
        email
      </Input>
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
        required
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
      {/* <Input
        placeholder='enter password...'
        name='password'
        required
        type='password'
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
      </Input> */}
      {errorMessage && (
        <Typography
          component='span'
          variant='title-3'
          className='pl-2 text-center font-bold text-red-700'
        >
          {errorMessage}
        </Typography>
      )}
      <Button
        disabled={isLoading}
        type='submit'
        variant='activity'
        className='hover:contrast-125'
      >
        sign Up
      </Button>
    </form>
  );
};

export default SignUpForm;
