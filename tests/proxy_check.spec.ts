import { test, expect } from '@playwright/test';

const url = 'https://ipify.org';

const myProxy = {
  ip: '193.124.176.206:9355',
  user: 'v5FNzr',
  password: 'EXVPPJ',
};

test('Проверка прокси', async ({ browser }) => {
  const context = await browser.newContext({
    proxy: {
      server: `http://${myProxy.ip}`,
      username: myProxy.user,
      password: myProxy.password,
    },
  });

  const page = await context.newPage();

  try {
    await page.goto(url, { timeout: 60000, waitUntil: 'commit' });
    const currentIp = await page.textContent('body');
    console.log(`Твой IP в браузере: ${currentIp}`);
    if (currentIp?.includes('193.124.176')) {
      console.log('РЕЗУЛЬТАТ: Прокси работает!');
    }
  } finally {
    await context.close();
  }
});
