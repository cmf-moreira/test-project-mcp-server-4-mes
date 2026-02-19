import { config as loadEnv } from 'dotenv';

loadEnv();

const toBoolean = (value: string | undefined, defaultValue: boolean): boolean => {
  if (value === undefined || value === '') {
    return defaultValue;
  }

  return ['true', '1', 'yes', 'on'].includes(value.toLowerCase());
};

const required = (name: string, fallback?: string): string => {
  const value = process.env[name] ?? fallback;
  if (!value) {
    throw new Error(
      `[config] Missing required environment variable ${name}. Add it to your shell or .env file.`,
    );
  }
  return value;
};

export const env = {
  mesBaseUrl: required('MES_BASE_URL', 'https://example.com'),
  browserName: process.env.BROWSER_NAME ?? 'chromium',
  headless: toBoolean(process.env.HEADLESS, true),
  workers: Number(process.env.PW_WORKERS ?? '2'),
  retries: Number(process.env.PW_RETRIES ?? '1'),
  videoMode: process.env.PW_VIDEO ?? 'on',
  traceMode: process.env.PW_TRACE ?? 'retain-on-failure',
  screenshotMode: process.env.PW_SCREENSHOT ?? 'only-on-failure',
  storageStatePath: process.env.PW_STORAGE_STATE ?? 'artifacts/auth/storage-state.json',
  retainDays: Number(process.env.ARTIFACT_RETAIN_DAYS ?? '14'),
};
