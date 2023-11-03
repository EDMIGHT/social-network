import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import TagsControl from '@/components/TagsControl';
import Button from '@/components/ui/Button';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { Icons } from '@/components/ui/Icons';
import Textarea from '@/components/ui/Textarea';
import UploadPhoto from '@/components/UploadPhoto';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useUpdatePostMutation } from '@/services/post.service';
import {
  IResponsePost,
  isErrorWithMessage,
  isInvalidResponseWithDetails,
} from '@/types/responses.types';
import { Tag } from '@/types/tag.types';
import { editPostValidation, IEditPostFields } from '@/utils/validations/post.validations';

const EditPostForm: React.FC<IResponsePost> = ({ id, text: PostTest, img, tags }) => {
  const navigate = useNavigate();
  const { accessToken } = useAppSelector((state) => state.user);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);

  const [updatePost, { isLoading }] = useUpdatePostMutation();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    setValue,
    formState: { errors },
  } = useForm<IEditPostFields>({
    resolver: zodResolver(editPostValidation),
    defaultValues: {
      text: '',
    },
  });

  const onClickDeleteImg = () => {
    setValue('img', undefined);
  };
  const onUploadNewImg = (newImg: string | null) => {
    setValue('img', newImg || undefined);
  };

  const onSubmit = handleSubmit(async ({ text, img: uploadedImg }) => {
    const newTags = selectedTags.map((tag) => tag.name).join(',');

    if (!accessToken) {
      toast.error('You are not authorized to create a post');
      return;
    }

    if (!text && !uploadedImg) {
      toast.error('You cannot remove all content from a post.');
      return;
    }

    try {
      await updatePost({
        id,
        text,
        img: uploadedImg,
        tags: newTags,
      }).unwrap();

      setSelectedTags([]);
      reset();
      navigate(-1);
    } catch (error) {
      if (isInvalidResponseWithDetails(error)) {
        const { details } = error.data;
        const allFields = watch();

        details.forEach((detail) => {
          if (Object.prototype.hasOwnProperty.call(allFields, detail.path)) {
            setError(detail.path as keyof IEditPostFields, {
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
  });

  const uploadedImg = watch('img');

  return (
    <>
      <TagsControl selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
      {errors.tags && <ErrorMessage>{errors.tags.message}</ErrorMessage>}
      <form onSubmit={onSubmit} className='flex flex-col gap-2'>
        {img ? (
          <div className='relative h-[60vh] cursor-pointer bg-black'>
            <div className='absolute right-2 top-2 flex gap-2'>
              <UploadPhoto onChangeFile={onUploadNewImg}>
                <Icons.pencil className='h-6 w-6 hover:stroke-primary focus:stroke-primary' />
              </UploadPhoto>
              <button onClick={onClickDeleteImg}>
                <Icons.trash className='h-6 w-6 hover:stroke-primary focus:stroke-primary' />
              </button>
            </div>
            <img
              src={uploadedImg || img}
              alt='post-img'
              className='mx-auto h-full object-cover'
            />
          </div>
        ) : (
          <UploadPhoto
            onChangeFile={onUploadNewImg}
            className='relative flex h-[30vh] cursor-pointer flex-col  items-center justify-center gap-5 bg-black p-2'
          >
            <span className='text-5xl'>📷</span>
            <span> upload photo</span>
          </UploadPhoto>
        )}
        {errors.img && <ErrorMessage>{errors.img.message}</ErrorMessage>}
        <Textarea
          name='text'
          id='text-post'
          placeholder='write text here..'
          defaultValue={PostTest || ''}
          optionals={{
            ...register('text'),
          }}
          error={errors.text?.message}
        />
        <div className='flex gap-2'>
          <Button type='submit' className='w-40' isLoading={isLoading}>
            update
          </Button>
          <Button
            onClick={() => navigate(-1)}
            type='button'
            variant='highlight'
            className='w-40'
            disabled={isLoading}
          >
            cancel
          </Button>
        </div>
      </form>
    </>
  );
};

export default EditPostForm;
