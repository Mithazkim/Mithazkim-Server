import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import logger from '../../utils/logger';

// Error middleware

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function(err: any, req: Request, res: Response, next: NextFunction) {
  if (err && err instanceof mongoose.Error.ValidationError && err.errors)
    return res.status(400).json({ msg: err.errors[Object.keys(err.errors)[0]].message });

  logger.error('Exception caught in error middleware - ', err);
  res.status(500).end();
}
