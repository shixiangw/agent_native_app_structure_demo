import { describe, it, expect } from 'vitest'
import request from 'supertest'
import app from '../../backend/src/index'

describe('Health API', () => {
  it('should return 200 with status ok', async () => {
    const response = await request(app).get('/api/v1/health')

    expect(response.status).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.data.status).toBe('ok')
    expect(response.body.data.timestamp).toBeDefined()
  })

  it('should return 404 for unknown routes', async () => {
    const response = await request(app).get('/api/v1/nonexistent')

    expect(response.status).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.error).toBe('Route not found')
  })
})
