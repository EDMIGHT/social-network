import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Alert from '@/components/ui/Alert';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useAppSelector } from '@/hooks/reduxHooks';
import { IAuthQuery } from '@/services/auth.service';
import { useCreateTagMutation } from '@/services/tags.service';
import { Tag } from '@/types/tag.types';

interface CreateTagProps {
  name?: string;
  callback: (tag: Tag) => void;
}

interface ICreateTagForm {
  name: string;
}

const CreateTag: FC<CreateTagProps> = ({ name = '', callback }) => {
  const [isMessageError, SetMessageError] = useState<string | null>(null);

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

  const [createTag, { data: createdTag, isSuccess, isError }] = useCreateTagMutation();

  useEffect(() => {
    if (isSuccess && createdTag) {
      callback(createdTag);
    }
  }, [isSuccess]);

  const onSubmit = handleSubmit(async ({ name: nameFromForm }) => {
    if (accessToken) {
      const response = (await createTag({
        name: nameFromForm,
      })) as IAuthQuery;

      if (response.error?.data.message) {
        SetMessageError(response.error.data.message);
      }
    }
  });

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-2'>
      {isError && <Alert type='error'>{isMessageError || 'error creating tag'}</Alert>}
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
