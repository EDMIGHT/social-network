import { Request, Response } from 'express';

export const uploadImg = (request: Request, response: Response): Response => {
  return response.send({
    imgURL: `/uploads/${request.file?.originalname}`,
  });
};
