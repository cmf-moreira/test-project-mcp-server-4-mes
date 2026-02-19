import { test as base } from '@playwright/test';
import { env } from '@config/env';
import { LoginPage } from '@pages/login-page';

type MesFixtures = {
  loginPage: LoginPage;
};

export const test = base.extend<MesFixtures>({
  storageState: async ({}, use) => {
    await use(process.env.AUTH_ENABLED === 'true' ? env.storageStatePath : undefined);
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

export { expect } from '@playwright/test';
