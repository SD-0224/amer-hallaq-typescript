import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  res: Response,
) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
};