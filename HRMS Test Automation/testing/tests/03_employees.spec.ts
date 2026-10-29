import { test, expect } from '@playwright/test';
import { BugTracker } from '../utils/bugTracker';
import { login } from '../utils/auth';

test.describe('HRMS Employees Module - Functional Testing', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('TC004 - Employees page loads and lists employees', async ({ page }) => {
    try {
      await page.goto('/employees');
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);
      
      const currentUrl = page.url();
      console.log('Employees page URL:', currentUrl);
      expect(currentUrl).toContain('employee');
      
      await page.screenshot({ path: `../reports/artifacts/employees_list.png`, fullPage: true });
      
    } catch (error: any) {
      await BugTracker.logBug(page, 'TC004_EmployeesList', `Employees page failed: ${error.message}`, 'Navigate to employees page');
      throw error;
    }
  });

  test('TC005 - Check employees page functionality', async ({ page }) => {
    try {
      await page.goto('/employees');
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);
      
      // Check for buttons like Add, Create, etc.
      const buttons = await page.locator('button').count();
      console.log(`Found ${buttons} buttons on employees page`);
      
      // Check for table
      const tables = await page.locator('table').count();
      console.log(`Found ${tables} tables on employees page`);
      
      await page.screenshot({ path: `../reports/artifacts/employees_page_elements.png`, fullPage: true });
      
    } catch (error: any) {
      await BugTracker.logBug(page, 'TC005_EmployeesElements', `Employees page elements check failed: ${error.message}`, 'Checking page elements');
      throw error;
    }
  });
});
