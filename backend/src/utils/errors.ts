import { Request, Response, NextFunction } from 'express'
import { ApiResponse } from '../types'

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export const handleError = (err: Error, res: Response) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
    } satisfies ApiResponse<never>)
  }

  console.error('Unexpected error:', err)
  return res.status(500).json({
    success: false,
    error: 'Internal server error',
  } satisfies ApiResponse<never>)
}

export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next)
  }
}
