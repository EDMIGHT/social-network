const converterFileToBase64 = async (file: File): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => {
      reject(error);
    };
  });
};

export const convertImgToBase64 = async (file: File): Promise<string | null> => {
  const imageBASE64 = await converterFileToBase64(file);

  if (!imageBASE64) {
    return null;
  }

  return imageBASE64;
};
