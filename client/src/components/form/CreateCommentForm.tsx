import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import Card from '@/components/ui/Card';
import { Icons } from '@/components/ui/Icons';
import Input from '@/components/ui/Input';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useCreateCommentMutation } from '@/services/comment.service';
import { isErrorWithMessage, isInvalidResponseWithDetails } from '@/types/responses.types';
import {
  createCommentValidation,
  ICreateCommentFields,
} from '@/utils/validations/comment.validations';

interface ICreateCommentProps {
  id: string;
}

const CreateCommentForm: React.FC<ICreateCommentProps> = ({ id }) => {
  const { accessToken } = useAppSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    formState: { errors },
  } = useForm<ICreateCommentFields>({
    resolver: zodResolver(createCommentValidation),
    defaultValues: {
      text: '',
    },
  });

  const [createComment, { isLoading }] = useCreateCommentMutation();

  const onSubmit: SubmitHandler<ICreateCommentFields> = async ({ text }) => {
    if (!accessToken) {
      toast.error('You are not authorized to create a post');
      return;
    }

    try {
      await createComment({
        id,
        text,
      }).unwrap();

      reset();
    } catch (error) {
      if (isInvalidResponseWithDetails(error)) {
        const { details } = error.data;
        const allFields = watch();

        details.forEach((detail) => {
          if (Object.prototype.hasOwnProperty.call(allFields, detail.path)) {
            setError(detail.path as keyof ICreateCommentFields, {
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
    <Card>
      <form onSubmit={handleSubmit(onSubmit)} className='flex gap-2'>
        <Input
          name='text'
          id='text-comment'
          placeholder='write comment here..'
          optionals={{
            ...register('text'),
          }}
          error={errors.text?.message}
        />
        {isLoading ? (
          <div className='flex items-center justify-center'>
            <Icons.loading className='h-8 w-8 animate-spin stroke-primary' />
          </div>
        ) : (
          <button type='submit' disabled={isLoading} className='mt-[5px] flex items-start'>
            <Icons.sendingPlane className='h-8 w-8 stroke-primary hover:stroke-accent' />
          </button>
        )}
      </form>
    </Card>
  );
};

export default CreateCommentForm;
