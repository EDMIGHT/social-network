import React, { useRef } from 'react';

import Typography from '@/components/ui/Typography';

interface UploadPhotoProps {
  onChangeFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadPhoto: React.FC<UploadPhotoProps> = ({ onChangeFile }) => {
  const inputFileRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <button
        className='h-96 w-full rounded bg-light-bg-main p-2'
        onClick={() => inputFileRef.current && inputFileRef.current.click()}
      >
        <Typography component='h3' variant='title-2'>
          here you can upload your amazing photo <span className='text-[1.75rem]'>📷</span>
        </Typography>
        <Typography component='span' variant='description' className='text-activity'>
          (click)
        </Typography>
      </button>
      <input ref={inputFileRef} onChange={onChangeFile} type='file' hidden />
    </>
  );
};

export default UploadPhoto;
