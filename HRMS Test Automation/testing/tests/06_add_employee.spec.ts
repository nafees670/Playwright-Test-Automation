import { test, expect } from '@playwright/test';
import { BugTracker } from '../utils/bugTracker';
import { login } from '../utils/auth';

test.describe('HRMS Employees Module - Add Employee', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('TC006 - Add a new employee through the 4-step wizard', async ({ page }) => {
    const runId = Date.now().toString().slice(-7);
    const employee = {
      fullName: `E2E Employee ${runId}`,
      cnic: `42101-${runId}-3`,
      dob: '1995-05-15',
      emailUser: `e2e.${runId}`,
      mobile: '0321-1234567',
      address: 'Karachi, Pakistan',
      city: 'Karachi',
    };

    try {
      await page.goto('/employees/new');
      await expect(page.getByRole('heading', { name: 'Add Employee' })).toBeVisible();

      // Step 1 - Identity
      await page.getByPlaceholder('Ahmed Ali').fill(employee.fullName);
      await page.getByPlaceholder('12345-1234567-1').fill(employee.cnic);
      await page.locator('input[name="dob"]').fill(employee.dob);
      await page.locator('select[name="gender"]').selectOption('male');
      await page.locator('select[name="maritalStatus"]').selectOption('single');
      await page.getByRole('button', { name: /Next Step/ }).click();

      // Step 2 - Contact
      await page.getByPlaceholder('username').first().fill(employee.emailUser);
      await page.locator('input[type="tel"]').first().fill(employee.mobile);
      await page.locator('textarea[name="residentialAddress"]').fill(employee.address);
      await page.locator('input[name="city"]').fill(employee.city);
      await page.getByRole('button', { name: /Next Step/ }).click();

      // Step 3 - Placement
      const institution = page.locator('select[name="institutionCode"]');
      await expect(institution.locator('option')).not.toHaveCount(1);
      await institution.selectOption({ index: 1 });

      const branch = page.locator('select[name="assignments.0.branch_code"]');
      await expect(branch).toBeEnabled();
      await expect(branch.locator('option')).not.toHaveCount(1);
      await branch.selectOption({ index: 1 });

      const department = page.locator('select[name="assignments.0.department_id"]');
      await expect(department).toBeEnabled();
      await expect(department.locator('option')).not.toHaveCount(1);
      await department.selectOption({ index: 1 });

      const designation = page.locator('select[name="assignments.0.designation_id"]');
      await expect(designation).toBeEnabled();
      await expect(designation.locator('option')).not.toHaveCount(1);
      await designation.selectOption({ index: 1 });

      await page.getByRole('button', { name: /Next Step/ }).click();

      // Step 4 - History (remove the empty default experience row)
      await expect(page.getByRole('heading', { name: 'Work experience' })).toBeVisible();
      await page.getByRole('button', { name: 'Remove' }).click();

      // Submit and verify redirect + row in the employees table
      await page.getByRole('button', { name: /Create Employee/ }).click();
      await page.waitForURL(/\/employees(\?.*)?$/, { timeout: 20000 });
      await expect(page.getByRole('heading', { name: /E2E Employee/ }).first()).toBeVisible();

      await page.screenshot({ path: '../reports/artifacts/employee_created.png', fullPage: true });
    } catch (error: any) {
      await BugTracker.logBug(page, 'TC006_AddEmployee', `Add employee failed: ${error.message}`, 'Add employee wizard');
      throw error;
    }
  });
});
