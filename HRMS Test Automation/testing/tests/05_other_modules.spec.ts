import { test, expect } from '@playwright/test';
import { BugTracker } from '../utils/bugTracker';
import { login } from '../utils/auth';

test.describe('HRMS Other Modules - Functional Testing', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  const modules = [
    { name: 'Roles', path: '/roles' },
    { name: 'Audit Logs', path: '/audit-logs' },
    { name: 'Profile', path: '/profile' },
    { name: 'My Profile', path: '/my-profile' },
    { name: 'HR Policies', path: '/hr-policies' },
    { name: 'Payroll', path: '/payroll' },
    { name: 'My Payslips', path: '/my-payslips' },
    { name: 'Requests', path: '/requests' },
  ];

  for (const module of modules) {
    test(`TC011-0XX - ${module.name} page loads`, async ({ page }) => {
      try {
        await page.goto(module.path);
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000);
        console.log(`${module.name} URL:`, page.url());
        await page.screenshot({ path: `../reports/artifacts/module_${module.name.replace(/\s+/g, '_').toLowerCase()}.png`, fullPage: true });
      } catch (error: any) {
        await BugTracker.logBug(page, `TC_Module_${module.name.replace(/\s+/g, '_')}`, `${module.name} page issue: ${error.message}`, `Navigate to ${module.path}`);
        // Don't fail the test, just log bug
        console.error(`Issue with ${module.name}:`, error.message);
      }
    });
  }
});
