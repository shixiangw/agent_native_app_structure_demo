import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import HomePage from '../../frontend/src/pages/HomePage'

describe('HomePage', () => {
  it('should render the page title', () => {
    render(<HomePage />)

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Agent Native App')
  })

  it('should render the description text', () => {
    render(<HomePage />)

    const description = screen.getByText(/full-stack TypeScript application/i)
    expect(description).toBeInTheDocument()
  })

  it('should render the API health check link', () => {
    render(<HomePage />)

    const link = screen.getByRole('link', { name: /api health check/i })
    expect(link).toHaveAttribute('href', '/api/v1/health')
  })
})
