import { ICustomResponse } from '@/types/customResponse.interface';
import { Response } from 'express';

class CustomResponse implements ICustomResponse {
  ok(response: Response, data: any): void {
    response.status(200).send(data);
  }
  created(response: Response, data: any): void {
    response.status(201).send(data);
  }
  badRequest(response: Response, data: any): void {
    response.status(400).send(data);
  }
  conflict(response: Response, data: any): void {
    response.status(409).send(data);
  }
  serverError(response: Response, data: any): void {
    response.status(500).send(data);
  }
  unauthorized(response: Response, data: any): void {
    response.status(401).send(data);
  }
}

export default new CustomResponse();
