import { Request, Response, NextFunction } from 'express'
import { ZodSchema } from 'zod'

export const validate = (schema: ZodSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body)
      next()
    } catch (error) {
      if (error instanceof Error) {
        next(new Error(`Validation error: ${error.message}`))
      } else {
        next(new Error('Validation failed'))
      }
    }
  }
}
