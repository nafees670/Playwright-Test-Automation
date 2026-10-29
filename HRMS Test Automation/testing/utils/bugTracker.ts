import fs from 'fs';
import path from 'path';

const bugReportPath = path.resolve(__dirname, '../../../hrms.bug/reports/BUG_REPORT.md');
const bugScreenshotDir = path.resolve(__dirname, '../../../hrms.bug/screenshots');

export class BugTracker {
  static async logBug(page: any, testName: string, description: string, step: string) {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const screenshotName = `${testName.replace(/[^a-zA-Z0-9]/g, '_')}_${timestamp}.png`;
      const screenshotPath = path.join(bugScreenshotDir, screenshotName);

      let screenshotNote = '(page already closed)';
      if (!page.isClosed()) {
        fs.mkdirSync(bugScreenshotDir, { recursive: true });
        await page.screenshot({ path: screenshotPath, fullPage: true }).catch(() => {});
        screenshotNote = `screenshots/${screenshotName}`;
      }

      const bugEntry = `
## Bug Found - ${new Date().toISOString()}
**Test:** ${testName}  
**Step:** ${step}  
**Description:** ${description}  
**Screenshot:** ${screenshotNote}  
**URL:** ${page.isClosed() ? 'n/a' : page.url()}

---

`;
      
      fs.mkdirSync(path.dirname(bugReportPath), { recursive: true });
      if (!fs.existsSync(bugReportPath)) {
        const header = `# HRMS Bug Report\n\nGenerated: ${new Date().toISOString()}\n\n---\n\n`;
        fs.writeFileSync(bugReportPath, header + bugEntry);
      } else {
        fs.appendFileSync(bugReportPath, bugEntry);
      }
      
      console.error(`🐛 BUG LOGGED: ${description} - Screenshot saved: ${screenshotName}`);
    } catch (e) {
      console.error('Failed to log bug:', e);
    }
  }
}
