import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';

import Alert from '@/components/ui/Alert';
import Card from '@/components/ui/Card';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useGetProfileQuery } from '@/services/users.service';

import ProfileHeaderForm from './ProfileHeaderForm';
import ProfileHeaderInfo from './ProfileHeaderInfo';
import ProfileHeaderSkeleton from './ProfileHeaderSkeleton';
import ProfileNotFound from './ProfileNotFound';

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
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='h-6 w-6 hover:stroke-primary focus:stroke-primary'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
            />
          </svg>
        </button>
      )}
      {isEditMode ? (
        <ProfileHeaderForm data={data} onClickCancel={toggleEditMode} />
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
