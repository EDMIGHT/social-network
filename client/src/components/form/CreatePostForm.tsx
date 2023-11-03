import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import SearchTag from '@/components/SearchTag';
import Tags from '@/components/Tags';
import Card from '@/components/ui/Card';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { Icons } from '@/components/ui/Icons';
import Input from '@/components/ui/Input';
import UploadPhoto from '@/components/UploadPhoto';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useCreatePostMutation } from '@/services/post.service';
import { isErrorWithMessage, isInvalidResponseWithDetails } from '@/types/responses.types';
import { Tag } from '@/types/tag.types';
import { createPostValidation, ICreatePostFields } from '@/utils/validations/post.validations';

const CreatePostForm: React.FC = React.memo(() => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    setError,
    watch,
  } = useForm<ICreatePostFields>({
    resolver: zodResolver(createPostValidation),
    defaultValues: {
      text: '',
    },
  });
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const { accessToken } = useAppSelector((state) => state.user);

  const [createPost, { isLoading }] = useCreatePostMutation();

  const onClickDeleteImg = () => {
    setValue('img', undefined);
  };
  const onClickAddTag = (tag: Tag) => {
    const existTag = selectedTags.some((selectedTag) => selectedTag.id === tag.id);
    if (!existTag) {
      setSelectedTags((prev) => [...prev, tag]);
    } else {
      toast.error('Duplicate error', {
        description: 'You cant add duplicate tags to a post',
      });
    }
  };
  const onClickRemoveTag = (tag: Tag) => {
    setSelectedTags((prev) => prev.filter((prevTag) => prevTag.id !== tag.id));
  };

  const onSubmit = async ({ text, img }: ICreatePostFields) => {
    const tags = selectedTags.map((tag) => tag.name).join(',');

    if (!accessToken) {
      toast.error('You are not authorized to create a post');
      return;
    }

    if (!text && !img) {
      toast.error("You haven't added any content to create a post.");
      return;
    }

    try {
      await createPost({
        text,
        tags,
        img,
      }).unwrap();

      toast.success('Post successfully created');
      setSelectedTags([]);
      reset();
    } catch (error) {
      if (isInvalidResponseWithDetails(error)) {
        const { details } = error.data;
        const allFields = watch();

        details.forEach((detail) => {
          if (Object.prototype.hasOwnProperty.call(allFields, detail.path)) {
            setError(detail.path as keyof ICreatePostFields, {
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

  const imgSRC = watch('img');

  return (
    <Card className='space-y-2'>
      {imgSRC && (
        <div className='relative h-96 cursor-pointer bg-black'>
          <img src={imgSRC} alt='preview' className='mx-auto h-full object-cover' />
          <button type='button' onClick={onClickDeleteImg} className='absolute right-1 top-1'>
            <Icons.x className='h-6 w-6 hover:stroke-primary focus:stroke-primary' />
          </button>
        </div>
      )}
      {errors.img && <ErrorMessage>{errors.img.message}</ErrorMessage>}
      <SearchTag onClickTag={onClickAddTag} />
      {selectedTags.length > 0 && (
        <Tags data={selectedTags} className='p-0' onClick={onClickRemoveTag} />
      )}
      {errors.tags && <ErrorMessage>{errors.tags.message}</ErrorMessage>}
      <form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-2'>
        <div className='flex w-full flex-row justify-end gap-2'>
          <UploadPhoto
            className='mt-[6px] flex items-start'
            onChangeFile={(img) => setValue('img', img || undefined)}
          >
            <Icons.clip className='h-8 w-8 stroke-primary hover:stroke-accent' />
          </UploadPhoto>

          <Input
            name='text'
            id='text-post'
            placeholder='enter the text post...'
            optionals={{
              ...register('text'),
            }}
            error={errors.text ? errors.text.message : undefined}
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
        </div>
      </form>
    </Card>
  );
});

export default CreatePostForm;
