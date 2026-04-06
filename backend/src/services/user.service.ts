import { User, CreateUserInput, UpdateUserInput } from '../types'
import { hashPassword } from '../utils/auth'

// In-memory store for demo purposes
// Replace with Prisma client in production
const users: User[] = []

export class UserService {
  async findAll(): Promise<User[]> {
    return users
  }

  async findById(id: string): Promise<User | null> {
    return users.find((user) => user.id === id) ?? null
  }

  async findByEmail(email: string): Promise<User | null> {
    return users.find((user) => user.email === email) ?? null
  }

  async create(input: CreateUserInput): Promise<User> {
    const existing = await this.findByEmail(input.email)
    if (existing) {
      throw new Error('User with this email already exists')
    }

    const hashedPassword = await hashPassword(input.password)
    const user: User = {
      id: crypto.randomUUID(),
      email: input.email,
      name: input.name,
      password: hashedPassword,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    users.push(user)
    return { ...user, password: undefined } as unknown as User
  }

  async update(id: string, input: UpdateUserInput): Promise<User | null> {
    const index = users.findIndex((user) => user.id === id)
    if (index === -1) return null

    users[index] = {
      ...users[index],
      ...input,
      updatedAt: new Date(),
    }

    return users[index]
  }

  async delete(id: string): Promise<boolean> {
    const index = users.findIndex((user) => user.id === id)
    if (index === -1) return false

    users.splice(index, 1)
    return true
  }
}
