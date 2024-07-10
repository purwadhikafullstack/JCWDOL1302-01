import { Response, NextFunction } from 'express';
import { Request } from 'express';
import { verify } from 'jsonwebtoken';
import { API_KEY } from '../config';
import { User } from '../types/express';

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) throw new Error('Token invalid');

    const verifyUser = verify(token, String(API_KEY));
    if (!verifyUser) throw new Error('unauthorized');

    req.user = verifyUser as User;

    next();
  } catch (err) {
    next(err);
  }
};

const adminGuard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (
      String(req.user?.role).toLowerCase() !== 'super_admin' &&
      String(req.user?.role).toLowerCase() !== 'store_admin'
    )
      throw new Error('Unauthorized');

    next();
  } catch (err) {
    next(err);
  }
};

const superAdminGuard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (String(req.user?.role).toLowerCase() !== 'super_admin')
      throw new Error('Unauthorized');

    next();
  } catch (err) {
    next(err);
  }
};

const storeAdminGuard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (String(req.user?.role).toLowerCase() !== 'store_admin')
      throw new Error('Unauthorized');

    next();
  } catch (err) {
    next(err);
  }
};

const customerGuard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (String(req.user?.role).toLowerCase() !== 'customer')
      throw new Error('Unauthorized');

    next();
  } catch (err) {
    next(err);
  }
};

export { verifyToken, adminGuard, superAdminGuard, storeAdminGuard, customerGuard };
