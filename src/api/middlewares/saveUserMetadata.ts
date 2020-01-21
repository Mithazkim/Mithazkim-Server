import { NextFunction, Request, Response } from 'express';
import { userMetadataManager } from '../../managers';
import logger from '../../utils/logger';

export default function(req: Request, res: Response, next: NextFunction) {
  if (req.method === 'GET' && !req.session.hasBeenHere) {
    res.on('finish', () => {
      logger.info('saving new user metadata');

      userMetadataManager.addUserMetadata(req.useragent);
    });
  }

  if (!req.session.hasBeenHere) req.session.hasBeenHere = true;

  next();
}
