import { test, expect } from '@playwright/test';
import { BugTracker } from '../utils/bugTracker';
import { login } from '../utils/auth';

test.describe('HRMS Organizations/Institutions/Branches - Functional Testing', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('TC006 - Organizations page', async ({ page }) => {
    try {
      await page.goto('/organizations');
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);
      await page.screenshot({ path: `../reports/artifacts/organizations.png`, fullPage: true });
      console.log('Organizations URL:', page.url());
    } catch (error: any) {
      await BugTracker.logBug(page, 'TC006_Organizations', `Organizations page issue: ${error.message}`, 'Navigate to organizations');
      throw error;
    }
  });

  test('TC007 - Institutions page', async ({ page }) => {
    try {
      await page.goto('/institutions');
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);
      await page.screenshot({ path: `../reports/artifacts/institutions.png`, fullPage: true });
      console.log('Institutions URL:', page.url());
    } catch (error: any) {
      await BugTracker.logBug(page, 'TC007_Institutions', `Institutions page issue: ${error.message}`, 'Navigate to institutions');
      throw error;
    }
  });

  test('TC008 - Branches page', async ({ page }) => {
    try {
      await page.goto('/branches');
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);
      await page.screenshot({ path: `../reports/artifacts/branches.png`, fullPage: true });
      console.log('Branches URL:', page.url());
    } catch (error: any) {
      await BugTracker.logBug(page, 'TC008_Branches', `Branches page issue: ${error.message}`, 'Navigate to branches');
      throw error;
    }
  });

  test('TC009 - Departments page', async ({ page }) => {
    try {
      await page.goto('/departments');
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);
      await page.screenshot({ path: `../reports/artifacts/departments.png`, fullPage: true });
      console.log('Departments URL:', page.url());
    } catch (error: any) {
      await BugTracker.logBug(page, 'TC009_Departments', `Departments page issue: ${error.message}`, 'Navigate to departments');
      throw error;
    }
  });

  test('TC010 - Designations page', async ({ page }) => {
    try {
      await page.goto('/designations');
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);
      await page.screenshot({ path: `../reports/artifacts/designations.png`, fullPage: true });
      console.log('Designations URL:', page.url());
    } catch (error: any) {
      await BugTracker.logBug(page, 'TC010_Designations', `Designations page issue: ${error.message}`, 'Navigate to designations');
      throw error;
    }
  });
});
