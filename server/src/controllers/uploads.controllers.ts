import { Request, Response } from 'express';

export const uploadImg = (request: Request, response: Response): Response => {
  const serverAddress = `${request.protocol}://${request.get('host')}`;

  return response.send({
    imgURL: `${serverAddress}/uploads/${request.file?.originalname}`,
  });
};
