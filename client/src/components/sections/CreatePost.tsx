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
  } = useForm<ICreatePost>();

  const [imgURL, setImgURL] = useState<string | null>(null);

  const { accessToken } = useAppSelector((state) => state.user);

  const [createPost, { isLoading }] = useCreatePostMutation();

  const changeFileHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && accessToken) {
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
    await createPost({ accessToken, ...data });

    console.log(data);
  };

  return (
    <Card className='flex flex-col gap-2'>
      <UploadPhoto onChangeFile={changeFileHandler} />

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
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
        >
          text post
        </Input>
        <Button type='submit' variant='activity' className='w-1/5 hover:contrast-125'>
          post
        </Button>
      </form>
    </Card>
  );
};

export default CreatePost;
