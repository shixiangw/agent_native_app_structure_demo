import { test, expect } from '@playwright/test'

test('homepage should load successfully', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle(/Agent Native App/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Agent Native App')
})

test('homepage should have API health check link', async ({ page }) => {
  await page.goto('/')

  const healthLink = page.getByRole('link', { name: /api health check/i })
  await expect(healthLink).toBeVisible()
  await expect(healthLink).toHaveAttribute('href', '/api/v1/health')
})
