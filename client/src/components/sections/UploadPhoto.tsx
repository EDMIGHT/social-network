import React, { useRef } from 'react';

import Typography from '@/components/ui/Typography';

const UploadPhoto: React.FC = () => {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const changeFileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files);
  };

  return (
    <>
      <button
        className='h-96 w-full rounded bg-light-bg-main p-2'
        onClick={() => inputFileRef.current && inputFileRef.current.click()}
      >
        <Typography component='h3' variant='title-2'>
          here you can upload your amazing photo <span className='text-[1.75rem]'>📷</span>
        </Typography>
      </button>
      <input ref={inputFileRef} onChange={changeFileHandler} type='file' hidden />
    </>
  );
};

export default UploadPhoto;
