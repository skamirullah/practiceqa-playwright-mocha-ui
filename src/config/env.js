// Everything that changes between machines and environments, read once from the environment.
export const env = {
  baseUrl: process.env.BASE_URL ?? 'https://www.practiceqaautomation.com',
  browser: process.env.BROWSER ?? 'chromium',
  headless: process.env.HEADLESS !== 'false',
  slowMo: Number(process.env.SLOW_MO ?? 0),
  actionTimeout: 10_000,
  artifactsDir: 'artifacts',
};
