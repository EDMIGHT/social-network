import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Thumbnail from '@/components/ui/Thumbnail';
import Typography from '@/components/ui/Typography';
import { useAppDispatch } from '@/hooks/reduxHooks';
import useLocalStorage from '@/hooks/useLocalStorage';
import { IAuthQuery, useRegisterMutation } from '@/services/auth.service';
import FileService from '@/services/file.service';
import { setUserData } from '@/store/slices/user.slice';

import UploadPhoto from './UploadPhoto';

export interface ISignUpForm {
  name?: string;
  login: string;
  password: string;
  img: string;
}

const SignUpForm: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [setLocalStorage] = useLocalStorage();
  const [isLoginError, SetLoginError] = useState<string | null>(null);
  const [imgURL, setImgURL] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ISignUpForm>();

  const loginValue = watch('login') || 'test';

  const ImgSRC =
    imgURL ||
    `https://api.dicebear.com/6.x/fun-emoji/svg?seed=${loginValue}&backgroundColor=b6e3f4,c0aede,d1d4f9`;

  const [registerReq, { isLoading }] = useRegisterMutation();

  const changeFileHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);

      const data = await FileService.sendFile({ body: formData }).then((response) =>
        response.json()
      );

      setImgURL(data.imgURL);
    }
  };

  const onSubmit: SubmitHandler<ISignUpForm> = async (data) => {
    const response = (await registerReq({
      ...data,
      img: ImgSRC,
    })) as IAuthQuery; // ? idk как типизировать ответ ртк правильно

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
      <div className='flex items-center justify-center'>
        <UploadPhoto
          onChangeFile={changeFileHandler}
          className='h-[100px] w-[100px] hover:opacity-75'
        >
          <Thumbnail imgURL={ImgSRC} alt='me' />
        </UploadPhoto>
      </div>
      <Input
        placeholder='enter name...'
        name='name'
        optionals={{
          ...register('name', {
            minLength: {
              value: 2,
              message: 'the minimum login length is 2 characters',
            },
          }),
        }}
        error={errors.login ? errors.login.message : undefined}
      >
        name
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
          }),
        }}
        error={errors.login ? errors.login.message : undefined}
      >
        login
      </Input>
      <Input
        placeholder='enter password...'
        name='password'
        required
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
