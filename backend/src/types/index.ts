export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export interface User {
  id: string
  email: string
  name: string
  role: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateUserInput {
  email: string
  name: string
  password: string
}

export interface UpdateUserInput {
  name?: string
  email?: string
}
