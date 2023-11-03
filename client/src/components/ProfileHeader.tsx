import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';

import EditProfileForm from '@/components/form/EditProfileForm';
import ProfileHeaderInfo from '@/components/ProfileHeaderInfo';
import ProfileHeaderSkeleton from '@/components/ProfileHeaderSkeleton';
import ProfileNotFound from '@/components/ProfileNotFound';
import Alert from '@/components/ui/Alert';
import Card from '@/components/ui/Card';
import { Icons } from '@/components/ui/Icons';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useGetProfileQuery } from '@/services/users.service';

const ProfileHeader: FC = () => {
  const { login } = useParams();
  const { user } = useAppSelector((state) => state.user);

  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  const { data, isLoading, isSuccess, isError } = useGetProfileQuery(login as string);

  const loadingOrErrorElements = (isError || isLoading) && <ProfileHeaderSkeleton />;
  const notFoundElements = isSuccess && !data && <ProfileNotFound />;
  const successElements = isSuccess && data && (
    <Card className='relative flex w-full flex-col gap-2'>
      {isError && <Alert type='error'>error getting profile</Alert>}
      {!isEditMode && user && user.login === login && (
        <button onClick={toggleEditMode} className='absolute right-2 top-2'>
          <Icons.pencil className='h-6 w-6 hover:stroke-primary focus:stroke-primary' />
        </button>
      )}
      {isEditMode ? (
        <EditProfileForm data={data} onClickCancel={toggleEditMode} />
      ) : (
        <ProfileHeaderInfo data={data} />
      )}
    </Card>
  );

  return (
    <>
      {loadingOrErrorElements}
      {notFoundElements}
      {successElements}
    </>
  );
};

export default ProfileHeader;
