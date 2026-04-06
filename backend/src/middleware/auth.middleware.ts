import { Request, Response, NextFunction } from 'express'
import { AppError } from '../utils/errors'

export const authenticate = (req: Request, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader?.startsWith('Bearer ')) {
    return next(new AppError(401, 'Authentication required'))
  }

  const token = authHeader.split(' ')[1]

  try {
    // TODO: Implement JWT verification
    // const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    // req.user = decoded

    next()
  } catch {
    next(new AppError(401, 'Invalid or expired token'))
  }
}
