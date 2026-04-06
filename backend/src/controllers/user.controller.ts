import { Request, Response } from 'express'
import { asyncHandler, handleError, AppError } from '../utils/errors'
import { UserService } from '../services/user.service'

const userService = new UserService()

export const getUsers = asyncHandler(async (_req: Request, res: Response) => {
  const users = await userService.findAll()
  res.json({ success: true, data: users })
})

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const user = await userService.findById(id)

  if (!user) {
    throw new AppError(404, 'User not found')
  }

  res.json({ success: true, data: user })
})

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.create(req.body)
  res.status(201).json({ success: true, data: user })
})

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const user = await userService.update(id, req.body)

  if (!user) {
    throw new AppError(404, 'User not found')
  }

  res.json({ success: true, data: user })
})

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const deleted = await userService.delete(id)

  if (!deleted) {
    throw new AppError(404, 'User not found')
  }

  res.json({ success: true, data: { message: 'User deleted successfully' } })
})
