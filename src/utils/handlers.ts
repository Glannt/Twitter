import { NextFunction, Request, Response, RequestHandler } from 'express';
const wrapRequestHandler = (func: RequestHandler): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default wrapRequestHandler;
