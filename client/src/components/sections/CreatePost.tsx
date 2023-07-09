import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import { useAppSelector } from '@/hooks/reduxHooks';
import FileService from '@/services/file.service';
import { useCreatePostMutation } from '@/services/post.service';

import UploadPhoto from './UploadPhoto';

export interface ICreatePost {
  text: string;
}

const CreatePost: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICreatePost>();

  const [imgURL, setImgURL] = useState<string | null>(null);

  const { accessToken } = useAppSelector((state) => state.user);

  const [createPost, { isLoading }] = useCreatePostMutation();

  const changeFileHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0] && accessToken) {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);

      const data = await FileService.sendFile({ accessToken, body: formData }).then(
        (response) => response.json()
      );

      setImgURL(data.imgURL);
    }
  };

  const onSubmit = async (data: any) => {
    // TODO добавить выбор тэгов
    await createPost({ accessToken, ...data, img: imgURL || undefined });

    setImgURL(null);
    reset();
  };

  return (
    <Card className='flex flex-col gap-2'>
      {imgURL && (
        <div className='h-96 cursor-pointer bg-black'>
          <img src={imgURL} alt='preview' className='mx-auto h-full object-cover' />
        </div>
      )}
      <div className='flex w-full'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex w-full flex-row justify-end gap-2'
        >
          <UploadPhoto
            className='mt-[6px] flex items-start'
            onChangeFile={changeFileHandler}
          />

          <Input
            name='text'
            placeholder='enter the text post...'
            optionals={{
              ...register('text', {
                required: 'text is a required field',
                minLength: {
                  value: 1,
                  message: 'the minimum text length is 1 characters',
                },
              }),
            }}
            error={errors.text ? errors.text.message : undefined}
          />
          <button type='submit' className='mt-[6px] flex items-start'>
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
        </form>
      </div>
    </Card>
  );
};

export default CreatePost;
