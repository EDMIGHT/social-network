import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Alert from '@/components/ui/Alert';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Thumbnail from '@/components/ui/Thumbnail';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { useUpdateProfileMutation } from '@/services/users.service';
import { setUser } from '@/store/slices/user.slice';
import { IResponseProfile, isErrorWithMessage } from '@/types/responses.types';

import UploadPhoto from './UploadPhoto';

interface ProfileHeaderFormProps {
  data: IResponseProfile;
  onClickCancel: () => void;
}

export type IUpdateUserForm = Partial<Pick<IResponseProfile, 'email' | 'img' | 'name'>>;

const ProfileHeaderForm: FC<ProfileHeaderFormProps> = ({ data, onClickCancel }) => {
  const { img, email, name, login } = data;

  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUpdateUserForm>();
  const { accessToken } = useAppSelector((state) => state.user);
  const [localImg, setLocalImg] = useState<string | null>(img);
  const [messageError, setMessageError] = useState<string | null>(null);

  const [updateProfile, { isLoading, isError, isSuccess, data: updatedData }] =
    useUpdateProfileMutation();

  useEffect(() => {
    if (isSuccess && updatedData) {
      dispatch(setUser(updatedData));
      onClickCancel();
    }
  }, [isSuccess, updatedData]);

  const onSubmit = handleSubmit(async (formData) => {
    if (accessToken) {
      const response = await updateProfile({
        accessToken,
        ...formData,
        img: localImg as string,
      });

      if (isErrorWithMessage(response)) {
        setMessageError(response.error.data.message);
      }
    } else {
      setMessageError('you are not authorized to post');
    }
  });

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-2'>
      {(isError || messageError) && (
        <Alert type='error'>{messageError || 'error while updating user'}</Alert>
      )}
      <div className='flex gap-2'>
        <UploadPhoto onChangeFile={setLocalImg} className='h-36 w-48 hover:opacity-80'>
          <Thumbnail imgURL={localImg as string} alt={login} />
        </UploadPhoto>
        <div className='flex w-full flex-col gap-2'>
          <Input
            name='name'
            id='name-profile'
            placeholder='write name here..'
            defaultValue={name || undefined}
            optionals={{
              ...register('name', {
                maxLength: {
                  value: 100,
                  message: 'maximum name length is 100 characters',
                },
              }),
            }}
            error={errors.name?.message}
          >
            name
          </Input>
          <Input
            name='email'
            id='email-post'
            placeholder='write email here..'
            defaultValue={email || undefined}
            optionals={{
              ...register('email', {
                maxLength: {
                  value: 100,
                  message: 'maximum email length is 100 characters',
                },
              }),
            }}
            error={errors.email?.message}
          >
            email
          </Input>
        </div>
      </div>
      <div className='flex justify-end gap-2'>
        <Button type='submit' disabled={isLoading}>
          update
        </Button>
        <Button onClick={onClickCancel} variant='highlight'>
          cancel
        </Button>
      </div>
    </form>
  );
};

export default ProfileHeaderForm;
