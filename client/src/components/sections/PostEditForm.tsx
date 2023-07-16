import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/ui/Button';
import Textarea from '@/components/ui/Textarea';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useUpdatePostMutation } from '@/services/post.service';
import { ICreateCommentForm } from '@/types/comment.types';
import { IResponsePost, isErrorWithMessage } from '@/types/responses.types';
import { Tag } from '@/types/tag.types';

import Alert from '../ui/Alert';
import TagsControl from './TagsControl';
import UploadPhoto from './UploadPhoto';

const PostEditForm: React.FC<IResponsePost> = ({ id, text: PostTest, img, tags }) => {
  const navigate = useNavigate();
  const { accessToken } = useAppSelector((state) => state.user);
  const [localImg, setLocalImg] = useState(img);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const [isMessageError, SetMessageError] = useState<string | null>(null);

  const [updatePost, { isLoading, isSuccess, isError }] = useUpdatePostMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICreateCommentForm>();

  const onClickDeleteImg = () => {
    setLocalImg(null);
  };
  const onClickCancel = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (isSuccess) {
      setLocalImg(null);
      reset();
      onClickCancel();
    }
  }, [isSuccess]);

  const onSubmit = handleSubmit(async (data) => {
    if (accessToken) {
      const tagsQuery = selectedTags.map((tag) => tag.name).join(',');
      const response = await updatePost({
        accessToken,
        id,
        ...data,
        img: localImg,
        tags: tagsQuery,
      });

      if (isErrorWithMessage(response)) {
        SetMessageError(response.error.data.message);
      }
    } else {
      SetMessageError('you are not authorized to post');
    }
  });

  return (
    <>
      <TagsControl selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
      {(isError || isMessageError) && (
        <Alert type='error'>{isMessageError || 'post update error'}</Alert>
      )}
      <form onSubmit={onSubmit} className='flex flex-col gap-2'>
        {localImg ? (
          <div className='relative h-[60vh] cursor-pointer bg-black'>
            <div className='absolute right-2 top-2 flex gap-2'>
              <UploadPhoto onChangeFile={setLocalImg}>
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
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>
            <img src={localImg} alt='post-img' className='mx-auto h-full object-cover' />
          </div>
        ) : (
          <UploadPhoto
            onChangeFile={setLocalImg}
            className='relative flex h-[30vh] cursor-pointer flex-col  items-center justify-center gap-5 bg-black p-2'
          >
            <span className='text-5xl'>📷</span>
            <span> upload photo</span>
          </UploadPhoto>
        )}
        <Textarea
          name='text'
          id='text-post'
          placeholder='write text here..'
          defaultValue={PostTest || undefined}
          optionals={{
            ...register('text', {
              maxLength: {
                value: 280,
                message: 'maximum post length 280 characters',
              },
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
    </>
  );
};

export default PostEditForm;
