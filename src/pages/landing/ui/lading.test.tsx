import test, { expect } from '@playwright/test';

test.describe('랜딩페이지에서 로그인페이지로 이동한다.', () => {
  test('랜딩페이지에서 로그인 버튼을 클릭하면 로그인 페이지로 이동한다.', async ({ page }) => {
    await page.goto('/');

    // Check if the main heading is visible
    const mainHeading = page.locator('h1');
    await expect(mainHeading).toBeVisible();

    const ctaButton = page.getByText('로그인');
    await expect(ctaButton).toBeVisible();
    await ctaButton.click();

    await expect(page).toHaveURL(/.*\/login/);
  });

  test('랜딩페이지에서 시작하기 버튼을 클릭하면 로그인 페이지로 이동한다.', async ({ page }) => {
    await page.goto('/');

    // Check if the main heading is visible
    const mainHeading = page.locator('h1');
    await expect(mainHeading).toBeVisible();

    const ctaButton = page.getByText('시작하기');
    await expect(ctaButton).toBeVisible();
    await ctaButton.click();

    await expect(page).toHaveURL(/.*\/login/);
  });
});
