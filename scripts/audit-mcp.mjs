import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
let report;
try {
  report = JSON.parse(execFileSync('npm', ['audit', '--prefix', 'packages/mcp', '--omit=dev', '--json'], { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }));
} catch (error) {
  try { report = JSON.parse(String(error.stdout)); } catch { throw new Error('npm security audit unavailable; verification incomplete'); }
}
if (!report.metadata?.vulnerabilities) throw new Error('npm audit did not return vulnerability data');
mkdirSync(root + 'evidence/mcp', { recursive: true });
writeFileSync(root + 'evidence/mcp/security-audit.json', JSON.stringify({ checkedAt: new Date().toISOString(),
  scope: 'packages/mcp production dependency lockfile', vulnerabilities: report.metadata.vulnerabilities,
  advisories: Object.keys(report.vulnerabilities ?? {}) }, null, 2) + '\n');
if (report.metadata.vulnerabilities.total !== 0) throw new Error('MCP dependencies have known vulnerabilities; review before distribution');
console.log('MCP production dependency audit: zero known vulnerabilities');
