import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import PasswordInput from '@/components/PasswordInput';
import Button from '@/components/ui/Button';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { Icons } from '@/components/ui/Icons';
import Input from '@/components/ui/Input';
import Thumbnail from '@/components/ui/Thumbnail';
import UploadPhoto from '@/components/UploadPhoto';
import { useAppDispatch } from '@/hooks/reduxHooks';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useRegisterMutation } from '@/services/auth.service';
import { setUserData } from '@/store/slices/user.slice';
import { isErrorWithMessage, isInvalidResponseWithDetails } from '@/types/responses.types';
import { generateImgByLogin } from '@/utils/generateImgByLogin';
import { ISignUpFields, signUpValidation } from '@/utils/validations/auth.validations';

const defaultImg = generateImgByLogin();

const SignUpForm: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [setLocalStorage] = useLocalStorage();
  const [imgURL, setImgURL] = useState<string>(defaultImg);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    setValue,
    formState: { errors },
  } = useForm<ISignUpFields>({
    resolver: zodResolver(signUpValidation),
    defaultValues: {
      email: '',
      login: '',
      name: '',
      password: '',
    },
  });

  const loginValue = watch('login');
  const uploadedImgURL = watch('img');

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!uploadedImgURL && loginValue) {
        const newImgURL = generateImgByLogin(loginValue);
        setImgURL(newImgURL);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [loginValue, uploadedImgURL]);

  const [registerReq, { isLoading }] = useRegisterMutation();

  const onSubmit: SubmitHandler<ISignUpFields> = async ({
    login,
    img,
    password,
    email,
    name,
  }) => {
    try {
      const response = await registerReq({
        login,
        password,
        email,
        name,
        img,
      }).unwrap();

      dispatch(setUserData(response));

      setLocalStorage('accessToken', response.accessToken);
      setLocalStorage('refreshToken', response.refreshToken);

      navigate('/');
    } catch (error) {
      if (isInvalidResponseWithDetails(error)) {
        const { details } = error.data;
        const allFields = watch();

        details.forEach((detail) => {
          if (Object.prototype.hasOwnProperty.call(allFields, detail.path)) {
            setError(detail.path as keyof ISignUpFields, {
              type: 'server',
              message: detail.msg,
            });
          } else {
            toast.error('Validation error not from form', {
              description: detail.msg,
            });
          }
        });
      } else if (isErrorWithMessage(error)) {
        toast.error('Validation error', {
          description: error.message,
        });
      } else {
        toast.error('Validation error', {
          description: 'A validation error occurred that was not caused by the serve',
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
      <div className='flex flex-col items-center justify-center gap-1'>
        <UploadPhoto
          onChangeFile={(img) => setValue('img', img || undefined)}
          className='h-[100px] w-[100px]'
        >
          <div className='group relative'>
            <Thumbnail
              imgURL={uploadedImgURL || imgURL}
              alt='me'
              className=' transition group-hover:brightness-75'
            />

            <Icons.camera className='absolute left-1/2 top-1/2 z-20 h-10 w-10 -translate-x-1/2 -translate-y-1/2 opacity-0  transition-all group-hover:opacity-100' />
          </div>
        </UploadPhoto>
        {errors.img && <ErrorMessage>{errors.img.message}</ErrorMessage>}
      </div>
      <Input
        placeholder='enter name...'
        name='name'
        optionals={{
          ...register('name'),
        }}
        error={errors.name ? errors.name.message : undefined}
      >
        name
      </Input>
      <Input
        placeholder='enter email...'
        name='email'
        optionals={{
          ...register('email'),
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
          ...register('login'),
        }}
        error={errors.login ? errors.login.message : undefined}
      >
        login
      </Input>
      <PasswordInput
        required
        optionals={{
          ...register('password'),
        }}
        error={errors.password ? errors.password.message : undefined}
      >
        password
      </PasswordInput>
      <Button
        isLoading={isLoading}
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
