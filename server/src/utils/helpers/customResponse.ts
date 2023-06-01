import { Response } from 'express';

class CustomResponse {
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
}

const customResponse = new CustomResponse();

export default customResponse;
