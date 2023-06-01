import { Response } from 'express';

export interface ICustomResponse {
  ok: (response: Response, data: any) => void;
  created: (response: Response, data: any) => void;
  badRequest: (response: Response, data: any) => void;
  conflict: (response: Response, data: any) => void;
  serverError: (response: Response, data: any) => void;
  unauthorized: (response: Response, data: any) => void;
}
