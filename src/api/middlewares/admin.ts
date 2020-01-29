import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getTokenFromHeader } from './../../utils/common';
import { Errors } from '../../utils/errors';

// Authentication middleware
export default function(req: Request, res: Response, next: NextFunction) {
  const token = getTokenFromHeader(req);

  // Check for token
  console.log(`token: ${token}`);
  if (!token) {
    next();
  } else {
    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY) as User;
      if (!decoded) return res.status(401).json({ msg: Errors.InvalidToken });

      return res.status(400).json({ msg: Errors.AdminRankUpdate });
    } catch {
      res.status(401).json({ msg: Errors.InvalidToken });
    }
  }
}
