import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useCreateTagMutation } from '@/services/tags.service';
import { Tag } from '@/types/tag.types';

interface CreateTagProps {
  name?: string;
  callback: (tag: Tag) => void;
}

interface ICreateTagForm {
  name: string;
}

const CreateTag: React.FC<CreateTagProps> = ({ name = '', callback }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateTagForm>({
    defaultValues: {
      name,
    },
  });

  const { accessToken } = useAppSelector((state) => state.user);

  const [createTag, { data: createdTag, isSuccess }] = useCreateTagMutation();

  useEffect(() => {
    if (isSuccess && createdTag) {
      callback(createdTag);
    }
  }, [isSuccess]);

  const onSubmit = handleSubmit(async ({ name: nameFromForm }) => {
    if (accessToken) {
      await createTag({
        accessToken,
        name: nameFromForm,
      });
    }
  });

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-2'>
      <Input
        name='name'
        id='tag-name'
        optionals={{
          ...register('name', {
            required: 'this field is required',
          }),
        }}
        error={errors.name ? errors.name.message : undefined}
      >
        write here a tag name..
      </Input>
      <Button type='submit'>create</Button>
    </form>
  );
};

export default CreateTag;
