import React from 'react';
import { useForm } from 'react-hook-form';

import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useCreateCommentMutation } from '@/services/comment.service';
import { ICreateCommentForm } from '@/types/comment.types';

interface ICreateCommentProps {
  id: string;
}

const CreateComment: React.FC<ICreateCommentProps> = ({ id }) => {
  const { accessToken } = useAppSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICreateCommentForm>();

  const [createComment, { isLoading }] = useCreateCommentMutation();

  const onSubmit = handleSubmit(({ text }) => {
    if (accessToken) {
      createComment({
        id,
        accessToken,
        text,
      });

      reset();
    }
  });

  return (
    <Card>
      <form onSubmit={onSubmit} className='flex flex-col gap-2'>
        <div className='flex gap-2'>
          <Input
            name='text'
            id='text-comment'
            placeholder='write comment here..'
            optionals={{
              ...register('text', {
                required: 'this field is required to create a comment',
              }),
            }}
            error={errors.text?.message}
          />
          <button type='submit' disabled={isLoading} className='mt-[5px] flex items-start'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-8 w-8 stroke-primary hover:stroke-accent'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5'
              />
            </svg>
          </button>
        </div>
      </form>
    </Card>
  );
};

export default CreateComment;
