import test, { expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

test.describe('로그인 페이지 기능 테스트', () => {
  test('로그인 버튼이 화면에 보인다.', async ({ page }) => {
    await page.goto('/login');

    const loginButton = page.getByRole('button', { name: 'Google로 계속하기' });
    await expect(loginButton).toBeVisible();
  });

  test('로그인 버튼을 클릭하면 구글 로그인 페이지로 이동한다.', async ({ page }) => {
    await page.goto('/login');

    const loginButton = page.getByRole('button', { name: 'Google로 계속하기' });
    await loginButton.click();

    await expect(page).toHaveURL(/.*\/accounts.google.com/);
  });
});
