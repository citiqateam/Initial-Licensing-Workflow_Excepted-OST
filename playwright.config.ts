// @ts-check
import defineConfig from '@playwright/test';
import devices from '@playwright/test';
import { trace } from 'console';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({

  testDir: './tests',
  timeout: 50000,
  expect: {
    timeout: 50000
  },
  reporter: 'html',
  //globalSetup: require.resolve('./tests/GlobalSetup.spec.js'),

  use: {

    browserName: 'chromium',
    headless: process.env.CI ? true : false,  // headless only in CI
    screenshots: 'only-on-failure',
    trace: 'off',
    //storageState: 'storageState.json',
  
    },

   
  });
  
  module.exports = config;