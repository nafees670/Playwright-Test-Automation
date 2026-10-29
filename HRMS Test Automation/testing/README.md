# HRMS Playwright Functional Testing

This folder contains Playwright-based functional tests for the HRMS frontend.

## Credentials
- Username: NAFEES1.AIT
- Password: Admin@28

## Setup
```bash
cd hrmsplaywright/testing
npm install
npx playwright install
```

## Running Tests
```bash
# Run all tests (headed mode to see browser)
npm run test:headed

# Run tests headless
npm test

# Debug mode
npm run test:debug

# View report
npm run report
```

## Test Structure
- `tests/01_login.spec.ts` - Login functionality
- `tests/02_dashboard.spec.ts` - Dashboard and navigation
- `tests/03_employees.spec.ts` - Employees module
- `tests/04_organizations.spec.ts` - Org structure (Orgs, Institutions, Branches, Depts, Designations)
- `tests/05_other_modules.spec.ts` - Other modules (Roles, Audit, Profile, Payroll, etc.)
- `tests/06_add_employee.spec.ts` - Add Employee 4-step wizard (creates a unique employee each run)

## Bug Reports
All bugs found during testing are logged to `../../hrms.bug/reports/BUG_REPORT.md` with screenshots in `../../hrms.bug/screenshots/`
