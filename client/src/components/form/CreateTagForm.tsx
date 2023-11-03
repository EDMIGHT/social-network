import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useCreateTagMutation } from '@/services/tags.service';
import { isErrorWithMessage, isInvalidResponseWithDetails } from '@/types/responses.types';
import { Tag } from '@/types/tag.types';
import { createTagValidation, ICreateTagFields } from '@/utils/validations/tag.validations';

interface CreateTagProps {
  name?: string;
  callback: (tag: Tag) => void;
}

const CreateTagForm: FC<CreateTagProps> = ({ name = '', callback }) => {
  const { accessToken } = useAppSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<ICreateTagFields>({
    resolver: zodResolver(createTagValidation),
    defaultValues: {
      name,
    },
  });

  const [createTag, { isLoading }] = useCreateTagMutation();

  const onSubmit = handleSubmit(async ({ name: nameFromForm }) => {
    if (!accessToken) {
      toast.error('You are not authorized to create a post');
      return;
    }

    try {
      const response = await createTag({
        name: nameFromForm,
      }).unwrap();

      callback(response);
    } catch (error) {
      if (isInvalidResponseWithDetails(error)) {
        const { details } = error.data;
        const allFields = watch();

        details.forEach((detail) => {
          if (Object.prototype.hasOwnProperty.call(allFields, detail.path)) {
            setError(detail.path as keyof ICreateTagFields, {
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

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-2'>
      <Input
        name='name'
        id='tag-name'
        optionals={{
          ...register('name'),
        }}
        error={errors.name ? errors.name.message : undefined}
      >
        write here a tag name..
      </Input>
      <Button type='submit' isLoading={isLoading}>
        create
      </Button>
    </form>
  );
};

export default CreateTagForm;
