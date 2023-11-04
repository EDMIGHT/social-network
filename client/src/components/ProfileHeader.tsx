import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import EditProfileForm from '@/components/form/EditProfileForm';
import ProfileHeaderInfo from '@/components/ProfileHeaderInfo';
import ProfileNotFound from '@/components/ProfileNotFound';
import ProfileHeaderSkeleton from '@/components/skeletons/ProfileHeaderSkeleton';
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

  useEffect(() => {
    if (isError) {
      toast.error('Oops, something went wrong!', {
        description: 'Please try again later or reload the page',
      });
    }
  }, [isError]);

  const loadingOrErrorElements = (isError || isLoading) && <ProfileHeaderSkeleton />;
  const notFoundElements = isSuccess && !data && <ProfileNotFound />;
  const successElements = isSuccess && data && (
    <Card className='relative flex w-full flex-col gap-2'>
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
