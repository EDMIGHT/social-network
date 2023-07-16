import React, { ReactNode, useRef } from 'react';

import FileService from '@/services/file.service';
import { cn } from '@/utils/cn';

interface UploadPhotoProps {
  className?: string;
  children: ReactNode;
  onChangeFile: React.Dispatch<React.SetStateAction<string | null>>;
}

const UploadPhoto: React.FC<UploadPhotoProps> = ({ onChangeFile, className, children }) => {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const changeFileHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);

      const data = await FileService.sendFile({ body: formData }).then((response) =>
        response.json()
      );

      onChangeFile(data.imgURL);
    }
  };

  return (
    <>
      <button
        type='button'
        onClick={() => inputFileRef.current && inputFileRef.current.click()}
        className={cn(className)}
      >
        {children}
      </button>
      <input ref={inputFileRef} onChange={changeFileHandler} type='file' hidden />
    </>
  );
};

export default UploadPhoto;
