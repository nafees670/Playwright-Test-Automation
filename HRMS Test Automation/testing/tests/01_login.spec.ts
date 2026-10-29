import { test, expect } from '@playwright/test';
import { credentials } from '../utils/credentials';
import { BugTracker } from '../utils/bugTracker';

test.describe('HRMS Login - Functional Testing', () => {
  test(`TC001 - Login with valid credentials (${credentials.username})`, async ({ page }) => {
    try {
      await page.goto('/login', { waitUntil: 'domcontentloaded' });
      
      // Fill login form
      await page.fill('input[type="text"]', credentials.username);
      await page.fill('input[type="password"]', credentials.password);
      
      // Click login button
      await page.click('button[type="submit"]');
      
      // Wait for navigation/dashboard
      await page.waitForURL((url) => !url.pathname.startsWith('/login'), { timeout: 30_000 });
      
      const currentUrl = page.url();
      console.log('Current URL after login:', currentUrl);
      
      // Check if login successful - should redirect away from login
      expect(currentUrl).not.toContain('/login');
      
      // Take screenshot on success
      await page.screenshot({ path: `../reports/artifacts/login_success.png`, fullPage: true });
      
    } catch (error: any) {
      await BugTracker.logBug(page, 'TC001_Login', `Login failed with error: ${error.message}`, 'Login attempt with valid credentials');
      throw error;
    }
  });
});
