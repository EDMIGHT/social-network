import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import PasswordInput from '@/components/PasswordInput';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useAppDispatch } from '@/hooks/reduxHooks';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useLoginMutation } from '@/services/auth.service';
import { setUserData } from '@/store/slices/user.slice';
import { isErrorWithMessage, isInvalidResponseWithDetails } from '@/types/responses.types';
import { ISignInFields, signInValidation } from '@/utils/validations/auth.validations';

const SignInForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [setLocalStorage] = useLocalStorage();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<ISignInFields>({
    resolver: zodResolver(signInValidation),
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit: SubmitHandler<ISignInFields> = async (data) => {
    try {
      const response = await login(data).unwrap();

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
            setError(detail.path as keyof ISignInFields, {
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
        sign In
      </Button>
    </form>
  );
};

export default SignInForm;
