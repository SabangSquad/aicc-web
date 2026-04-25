import test, { expect } from '@playwright/test';

test.describe('챗봇 페이지 기능 테스트', () => {
  test('채팅페이지가 보인다.', async ({ page }) => {
    await page.goto('/chat/1');
    const chatInput = page.getByPlaceholder('메시지를 입력하세요...');
    await expect(chatInput).toBeVisible();
    await expect(page).toHaveURL(/.*\/chat/);
  });
  test('사용자가 메시지를 보내면 챗봇이 응답한다.', async ({ page }) => {
    await page.goto('/chat/1');
    const chatInput = page.getByPlaceholder('메시지를 입력하세요...');
    const initialMessages = await page.getByTestId('message-bubble').count();

    await chatInput.fill('문의할게 있습니다');
    await chatInput.press('Enter');

    await expect(page.getByTestId('message-bubble')).toHaveCount(initialMessages + 1);
  });
});
