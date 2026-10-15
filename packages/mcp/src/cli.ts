#!/usr/bin/env node
import { serveStdio } from '@modelcontextprotocol/server/stdio';
import { createServer, VERSION } from './server.js';

if (process.argv.length > 2) {
  process.stderr.write(process.argv[2] === '--version' ? `neural-ui-mcp ${VERSION}\n` : 'Usage: neural-ui-mcp (stdio only); --version\n');
  process.exitCode = process.argv[2] === '--version' ? 0 : 1;
} else {
  try {
    // Fail before opening transport when packaged data is missing or corrupted.
    const first = createServer();
    let fresh = true;
    const handle = serveStdio(() => {
      if (fresh) { fresh = false; return first; }
      return createServer();
    }, { onerror: () => { process.stderr.write('neural-ui-mcp: protocol error\n'); } });
    const close = () => { void handle.close().catch(() => { process.exitCode = 1; }); };
    process.once('SIGINT', close);
    process.once('SIGTERM', close);
  } catch {
    process.stderr.write('neural-ui-mcp: startup failed; verify package integrity and supported Node version\n');
    process.exitCode = 1;
  }
}
