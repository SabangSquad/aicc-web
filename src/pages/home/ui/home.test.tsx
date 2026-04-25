import { test, expect } from '@playwright/test';

test.describe('대시보드 페이지 기능 테스트', () => {
  test('대시보드가 보인다.', async ({ page }) => {
    await page.goto('/home', { waitUntil: 'commit' });
    await expect(page.getByText(/안녕하세요/)).toBeVisible();
  });

  test('사이드바가 보인다.', async ({ page }) => {
    await page.goto('/home', { waitUntil: 'commit' });
    await expect(page.getByRole('complementary')).toBeVisible();
  });
  test('AI 솔루션이 보인다.', async ({ page }) => {
    await page.route('**/solutions**', async route => {
      console.log('Mocking solutions!');
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          hours: 24,
          total_cases: 100,
          score: 85,
          stats: { by_category: [], by_emotion: [] },
          ai_analysis: { headline: 'AI 분석 결과', issues: [], strategies: [] },
        }),
      });
    });

    await page.goto('/home'); // commit 대신 기본값(load) 사용 권장
    await expect(page.getByText('AI Insight')).toBeVisible();
  });
});
