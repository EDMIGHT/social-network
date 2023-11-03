import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import Button from '@/components/ui/Button';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import Input from '@/components/ui/Input';
import Thumbnail from '@/components/ui/Thumbnail';
import UploadPhoto from '@/components/UploadPhoto';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { useUpdateProfileMutation } from '@/services/users.service';
import { setUser } from '@/store/slices/user.slice';
import {
  IResponseProfile,
  isErrorWithMessage,
  isInvalidResponseWithDetails,
} from '@/types/responses.types';
import {
  editProfileValidations,
  IEditProfileFields,
} from '@/utils/validations/profile.validations';

interface EditProfileFormProps {
  data: IResponseProfile;
  onClickCancel: () => void;
}

const EditProfileForm: FC<EditProfileFormProps> = ({ data, onClickCancel }) => {
  const { img, email, name, login } = data;

  const { accessToken } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    setValue,
    formState: { errors },
  } = useForm<IEditProfileFields>({
    resolver: zodResolver(editProfileValidations),
    defaultValues: {
      email: email || '',
      name: name || '',
    },
  });

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const onSubmit = handleSubmit(async (formData) => {
    if (!accessToken) {
      toast.error('You are not authorized to create a post');
      return;
    }

    try {
      const response = await updateProfile(formData).unwrap();

      dispatch(setUser(response));
      onClickCancel();
    } catch (error) {
      if (isInvalidResponseWithDetails(error)) {
        const { details } = error.data;
        const allFields = watch();

        details.forEach((detail) => {
          if (Object.prototype.hasOwnProperty.call(allFields, detail.path)) {
            setError(detail.path as keyof IEditProfileFields, {
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

  const uploadedImgURL = watch('img');

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-2'>
      <div className='flex gap-2'>
        <UploadPhoto
          onChangeFile={(newImg) => setValue('img', newImg || undefined)}
          className='h-36 w-48 hover:opacity-80'
        >
          <Thumbnail imgURL={uploadedImgURL || img} alt={login} />
        </UploadPhoto>
        {errors.img && <ErrorMessage>{errors.img.message}</ErrorMessage>}
        <div className='flex w-full flex-col gap-2'>
          <Input
            name='name'
            id='name-profile'
            placeholder='write name here..'
            optionals={{
              ...register('name'),
            }}
            error={errors.name?.message}
          >
            name
          </Input>
          <Input
            name='email'
            id='email-post'
            placeholder='write email here..'
            optionals={{
              ...register('email'),
            }}
            error={errors.email?.message}
          >
            email
          </Input>
        </div>
      </div>
      <div className='flex justify-end gap-2'>
        <Button type='submit' isLoading={isLoading}>
          update
        </Button>
        <Button onClick={onClickCancel} disabled={isLoading} variant='highlight'>
          cancel
        </Button>
      </div>
    </form>
  );
};

export default EditProfileForm;
