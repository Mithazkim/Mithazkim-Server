import { NextFunction, Request, Response } from 'express';
import { userMetadataManager } from '../../managers';
import logger from '../../utils/logger';
import expressUseragent from 'express-useragent';

export default function(req: Request, res: Response, next: NextFunction) {
  if (req.method === 'GET' && !req.session.hasBeenHere) {
    res.on('finish', () => {
      logger.info('saving new user metadata');
      const useragent = expressUseragent.parse(req.headers['user-agent']);
      userMetadataManager.addUserMetadata(useragent);
    });
  }

  if (!req.session.hasBeenHere) req.session.hasBeenHere = true;

  next();
}
