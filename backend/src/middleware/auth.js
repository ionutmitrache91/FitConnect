import jwt from 'jsonwebtoken';
import { findUserById } from '../models/userModel.js';
import { getJwtSecret } from '../services/tokenService.js';
import { httpError } from '../utils/httpError.js';

export async function requireAuth(req, _res, next) {
  try {
    const authorization = req.headers.authorization || '';
    const [scheme, token] = authorization.split(' ');

    if (scheme !== 'Bearer' || !token) {
      throw httpError(401, 'Authentication token is required.');
    }

    const payload = jwt.verify(token, getJwtSecret());
    const user = await findUserById(payload.sub);

    if (!user) {
      throw httpError(401, 'Authenticated user no longer exists.');
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.status) {
      next(error);
      return;
    }

    next(httpError(401, 'Invalid or expired authentication token.'));
  }
}

export async function optionalAuth(req, _res, next) {
  const authorization = req.headers.authorization || '';

  if (!authorization) {
    next();
    return;
  }

  return requireAuth(req, _res, next);
}

