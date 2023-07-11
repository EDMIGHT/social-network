import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/ui/Button';
import Textarea from '@/components/ui/Textarea';
import { useAppSelector } from '@/hooks/reduxHooks';
import FileService from '@/services/file.service';
import { useUpdatePostMutation } from '@/services/post.service';
import { ICreateCommentForm } from '@/types/comment.types';
import { IResponsePost } from '@/types/responses.types';

import UploadPhoto from './UploadPhoto';

const PostEditForm: React.FC<IResponsePost> = ({ id, text: PostTest, img }) => {
  const navigate = useNavigate();
  const { accessToken } = useAppSelector((state) => state.user);
  const [localImg, setLocalImg] = useState(img);

  const [updatePost, { isLoading, isSuccess }] = useUpdatePostMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICreateCommentForm>();

  const onClickDeleteImg = () => {
    setLocalImg(null);
  };
  const onClickUploadPhoto = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0] && accessToken) {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);

      const data = await FileService.sendFile({ accessToken, body: formData }).then(
        (response) => response.json()
      );

      setLocalImg(data.imgURL);
    }
  };
  const onClickCancel = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (isSuccess) {
      onClickCancel();
    }
  }, [isSuccess]);

  const onSubmit = handleSubmit(async (data) => {
    if (accessToken) {
      await updatePost({ accessToken, id, ...data, img: localImg });
    }

    setLocalImg(null);
    reset();
  });

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-2'>
      {localImg ? (
        <div className='relative h-[60vh] cursor-pointer bg-black'>
          <div className='absolute right-2 top-2 flex gap-2'>
            <UploadPhoto onChangeFile={onClickUploadPhoto}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='h-6 w-6 hover:stroke-primary focus:stroke-primary'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
                />
              </svg>
            </UploadPhoto>
            <button onClick={onClickDeleteImg}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='h-6 w-6 hover:stroke-primary focus:stroke-primary'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>
          <img src={localImg} alt='post-img' className='mx-auto h-full object-cover' />
        </div>
      ) : (
        <div className='relative flex h-[30vh] cursor-pointer flex-col  items-center justify-center gap-5 bg-black p-2'>
          <span className='text-5xl'>📷</span>
          <UploadPhoto onChangeFile={onClickUploadPhoto}>
            <Button type='button'>Upload photo</Button>
          </UploadPhoto>
        </div>
      )}
      <Textarea
        name='text'
        id='text-comment'
        placeholder='write comment here..'
        defaultValue={PostTest || undefined}
        optionals={{
          ...register('text', {
            required: 'this field is required to create a comment',
          }),
        }}
        error={errors.text?.message}
      />
      <div className='flex gap-2'>
        <Button type='submit' className='w-40' disabled={isLoading}>
          update
        </Button>
        <Button onClick={onClickCancel} type='button' variant='highlight' className='w-40'>
          cancel
        </Button>
      </div>
    </form>
  );
};

export default PostEditForm;
