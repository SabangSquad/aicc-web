import test, { expect } from '@playwright/test';

test.describe('로그인 페이지 기능 테스트', () => {
  test('로그인 버튼이 화면에 보인다.', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    const loginButton = page.getByRole('button', { name: 'Google로 계속하기' });
    await expect(loginButton).toBeVisible();
  });

  test('로그인 버튼을 클릭하면 로그인 페이지로 이동한다.', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    const loginButton = page.getByRole('button', { name: 'Google로 계속하기' });
    await loginButton.click();

    await expect(page).toHaveURL(/.*\/auth\/google/);
  });

  test('로그인을 성공하여 세션 쿠키를 받으면 home 화면으로 이동한다.', async ({ context, page }) => {
    await context.addCookies([
      {
        name: 'connect.sid',
        value: 's%3A_mocked_session_id_12345.signature_string',
        domain: 'localhost',
        path: '/',
      },
    ]);

    await page.goto('http://localhost:3000/home');

    await expect(page).toHaveURL(/.*\/home/);
  });
});
