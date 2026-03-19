import test, { expect } from '@playwright/test';

test.describe('챗봇 페이지 기능 테스트', () => {
  test('채팅페이지가 보인다.', async ({ page }) => {
    await page.goto('http://localhost:3000/chat');
    const chatInput = page.getByPlaceholder('메시지를 입력하세요...');
    await expect(chatInput).toBeVisible();
    await expect(page).toHaveURL(/.*\/chat/);
  });

  test('랜딩페이지에서 시작하기 버튼을 클릭해 로그인 페이지로 이동한다.', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Check if the main heading is visible
    const mainHeading = page.locator('h1');
    await expect(mainHeading).toBeVisible();

    const ctaButton = page.getByText('시작하기');
    await expect(ctaButton).toBeVisible();
    await ctaButton.click();

    await expect(page).toHaveURL(/.*\/login/);
  });
});
