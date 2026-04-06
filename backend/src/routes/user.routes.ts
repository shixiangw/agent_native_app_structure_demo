import { Router } from 'express'
import * as userController from '../controllers/user.controller'
import { validate } from '../middleware/validate.middleware'
import { createUserSchema, updateUserSchema, idParamSchema } from '../types/user.schema'
import { authenticate } from '../middleware/auth.middleware'

const router = Router()

router.get('/', authenticate, userController.getUsers)
router.get('/:id', authenticate, validate(idParamSchema), userController.getUserById)
router.post('/', validate(createUserSchema), userController.createUser)
router.put('/:id', authenticate, validate(idParamSchema), validate(updateUserSchema), userController.updateUser)
router.delete('/:id', authenticate, validate(idParamSchema), userController.deleteUser)

export default router
