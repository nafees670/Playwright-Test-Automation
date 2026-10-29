import { test, expect } from '@playwright/test';
import { BugTracker } from '../utils/bugTracker';
import { login } from '../utils/auth';

test.describe('HRMS Dashboard - Functional Testing', () => {
  test.beforeEach(async ({ page }) => {
    // Login first
    await login(page);
  });

  test('TC002 - Dashboard loads correctly', async ({ page }) => {
    try {
      await page.waitForLoadState('domcontentloaded');
      const currentUrl = page.url();
      console.log('Dashboard URL:', currentUrl);
      
      // Check for common dashboard elements
      const hasContent = await page.locator('body').textContent();
      expect(hasContent).toBeTruthy();
      
      await page.screenshot({ path: `../reports/artifacts/dashboard_load.png`, fullPage: true });
      
    } catch (error: any) {
      await BugTracker.logBug(page, 'TC002_Dashboard', `Dashboard load issue: ${error.message}`, 'Dashboard loading after login');
      throw error;
    }
  });

  test('TC003 - Navigate through main menu items', async ({ page }) => {
    try {
      await page.waitForLoadState('domcontentloaded');
      
      const menuItems = [
        { name: 'Employees', selector: 'a[href*="employee"]' },
        { name: 'Departments', selector: 'a[href*="department"]' },
        { name: 'Branches', selector: 'a[href*="branch"]' },
        { name: 'Institutions', selector: 'a[href*="institution"]' },
        { name: 'Designations', selector: 'a[href*="designation"]' },
      ];
      
      for (const item of menuItems) {
        try {
          const link = page.locator(item.selector).first();
          if (await link.isVisible({ timeout: 2000 })) {
            console.log(`Found ${item.name} menu item`);
            await link.click();
            await page.waitForTimeout(1500);
            console.log(`${item.name} page URL: ${page.url()}`);
            await page.screenshot({ path: `../reports/artifacts/menu_${item.name.toLowerCase()}.png`, fullPage: true });
            await page.goBack();
            await page.waitForTimeout(1000);
          }
        } catch (e: any) {
          await BugTracker.logBug(page, `TC003_Menu_${item.name}`, `Menu item ${item.name} navigation failed: ${e.message}`, `Clicking ${item.name} menu`);
        }
      }
      
    } catch (error: any) {
      await BugTracker.logBug(page, 'TC003_Navigation', `Navigation test failed: ${error.message}`, 'Main menu navigation');
      throw error;
    }
  });
});
