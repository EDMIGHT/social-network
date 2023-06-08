import { Response } from 'express';

import { ICustomResponse } from '@/types/customResponse.interface';

class CustomResponse implements ICustomResponse {
  ok(response: Response, data: any): Response {
    return response.status(200).send(data);
  }
  created(response: Response, data: any): Response {
    return response.status(201).send(data);
  }
  badRequest(response: Response, data: any): Response {
    return response.status(400).send(data);
  }
  notFound(response: Response, data: any): Response {
    return response.status(404).send(data);
  }
  conflict(response: Response, data: any): Response {
    return response.status(409).send(data);
  }
  serverError(response: Response, data: any): Response {
    return response.status(500).send(data);
  }
  unauthorized(response: Response, data: any): Response {
    return response.status(401).send(data);
  }
}

export default new CustomResponse();
