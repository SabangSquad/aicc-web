import test, { expect } from '@playwright/test';

test.describe('대시보드 페이지 기능 테스트', () => {
  test('대시보드가 보인다.', async ({ page }) => {
    await page.goto('http://localhost:3000/home');
    const welcomeMessage = page.getByText(/안녕하세요/);
    await expect(welcomeMessage).toBeVisible();
  });
  test('사이드바가 보인다.', async ({ page }) => {
    await page.goto('http://localhost:3000/home');
    const sidebar = page.getByRole('complementary');
    await expect(sidebar).toBeVisible();
  });
  test('AI 솔루션이 보인다.', async ({ page }) => {
    await page.goto('http://localhost:3000/home');
    const aiSolution = page.getByText('AI Insight');
    await expect(aiSolution).toBeVisible();
  });
});
