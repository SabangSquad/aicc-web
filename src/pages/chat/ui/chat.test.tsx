import test, { expect } from '@playwright/test';

test.describe('챗봇 페이지 기능 테스트', () => {
  test('채팅페이지가 보인다.', async ({ page }) => {
    await page.goto('http://localhost:3000/chat');
    const chatInput = page.getByPlaceholder('메시지를 입력하세요...');
    await expect(chatInput).toBeVisible();
    await expect(page).toHaveURL(/.*\/chat/);
  });
});
