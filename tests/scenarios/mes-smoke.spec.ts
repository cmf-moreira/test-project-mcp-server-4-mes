import { expect, test } from '@fixtures/test-base';
import { env } from '@config/env';

test.describe('MES smoke scenarios', () => {
  test('MES-001: landing page is reachable and has visible heading', async ({ page }) => {
    // Business intent: operator can open the MES portal before shift start.
    await test.step('Navigate to MES entry page', async () => {
      await page.goto(env.mesBaseUrl, { waitUntil: 'domcontentloaded' });
    });

    await test.step('Verify key page content exists', async () => {
      const heading = page.getByRole('heading').first();
      await expect(
        heading,
        `Expected at least one heading on ${env.mesBaseUrl}. Check route availability and localization.`,
      ).toBeVisible();
    });
  });

  test('MES-002: placeholder login flow', async ({ loginPage }) => {
    test.skip(
      !process.env.MES_USERNAME || !process.env.MES_PASSWORD,
      'Set MES_USERNAME and MES_PASSWORD to enable credentialed login scenario.',
    );

    // Business intent: operator can authenticate and reach the working area.
    await test.step('Open login page', async () => {
      await loginPage.goto(env.mesBaseUrl);
    });

    await test.step('Submit credentials', async () => {
      await loginPage.login(process.env.MES_USERNAME!, process.env.MES_PASSWORD!);
    });

    await test.step('Assert post-login navigation happened', async () => {
      await expect(
        loginPage.page,
        'Expected URL to change after login. Validate selectors and login endpoint.',
      ).not.toHaveURL(new RegExp(`^${env.mesBaseUrl}/?$`));
    });
  });
});
