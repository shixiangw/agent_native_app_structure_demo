import { z } from 'zod'

export const createUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(1, 'Name is required').max(100),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const updateUserSchema = z.object({
  email: z.string().email('Invalid email address').optional(),
  name: z.string().min(1, 'Name is required').max(100).optional(),
})

export const idParamSchema = z.object({
  id: z.string().uuid('Invalid user ID'),
})

export type CreateUserInput = z.infer<typeof createUserSchema>
export type UpdateUserInput = z.infer<typeof updateUserSchema>
