#!/usr/bin/env node
// Start Trading Terminal in the background and open your browser. It keeps running after this
// terminal closes. If it's already running, this just opens the browser.
//   node scripts/launch.js            node scripts/launch.js --no-open
import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const first = Number(process.env.PORT) || 3777;
const same = (a, b) => !!a && path.resolve(a).toLowerCase() === path.resolve(b).toLowerCase();

async function running() {
  for (let p = first; p < first + 21; p++) {
    try {
      const r = await fetch(`http://127.0.0.1:${p}/api/health`, { signal: AbortSignal.timeout(700) });
      const j = await r.json();
      // Only this folder's copy counts; another install on the same port range is left alone.
      if (j.app === 'trading-terminal' && same(j.root, root)) return p;
    } catch { /* not this port */ }
  }
  return null;
}

function openBrowser(url) {
  const [cmd, args] = process.platform === 'win32' ? ['cmd', ['/c', 'start', '""', url]] : process.platform === 'darwin' ? ['open', [url]] : ['xdg-open', [url]];
  try { const c = spawn(cmd, args, { detached: true, stdio: 'ignore' }); c.on('error', () => {}); c.unref(); } catch { /* headless */ }
}

function startOutsideJob(log) {
  const q = (x) => '"' + x + '"';
  const env = process.env.PORT ? `set "PORT=${Number(process.env.PORT)}" && ` : '';
  const cmd = `cmd.exe /d /c "${env}${q(process.execPath)} ${q(path.join(root, 'server.js'))} >> ${q(log)} 2>&1"`;
  const ps = "$si = New-CimInstance -ClientOnly -CimClass (Get-CimClass Win32_ProcessStartup) -Property @{ShowWindow=[uint16]0}; " +
    "$r = Invoke-CimMethod -ClassName Win32_Process -MethodName Create -Arguments @{CommandLine=$env:QT_CMD; CurrentDirectory=$env:QT_CWD; ProcessStartupInformation=$si}; " +
    "exit [int]$r.ReturnValue";
  try {
    const r = spawnSync('powershell.exe', ['-NoProfile', '-NonInteractive', '-Command', ps], { env: { ...process.env, QT_CMD: cmd, QT_CWD: root }, windowsHide: true, timeout: 20000 });
    return r.status === 0;
  } catch { return false; }
}

let port = await running();
if (!port) {
  fs.mkdirSync(path.join(root, 'data'), { recursive: true });
  const log = path.join(root, 'data', 'server.log');
  const fd = fs.openSync(log, 'a');
  // On Windows, a process started from a terminal or an app (Claude, an IDE) sits in that app's
  // "job" and is killed when the app closes or restarts, even with detached: true. Windows
  // Management (WMI) starts the server outside any job, so it keeps running. Fallback: plain spawn.
  if (!(process.platform === 'win32' && startOutsideJob(log))) {
    const child = spawn(process.execPath, [path.join(root, 'server.js')], { cwd: root, detached: true, stdio: ['ignore', fd, fd], windowsHide: true, env: process.env });
    child.unref();
  }
  fs.closeSync(fd); // the server has its own copy
  for (let i = 0; i < 40 && !port; i++) { await new Promise((r) => setTimeout(r, 400)); port = await running(); }
  if (!port) {
    console.error(`Trading Terminal didn't start. Last lines of ${log}:\n${fs.readFileSync(log, 'utf8').split('\n').slice(-20).join('\n')}`);
  }
}
// No process.exit() here: on Windows, exiting while Node is still closing the browser launcher or a
// fetch connection can crash with "Assertion failed ... async.c". Setting exitCode lets Node finish first.
if (port) {
  const url = `http://localhost:${port}`;
  if (!process.argv.includes('--no-open') && process.env.QT_NO_OPEN !== '1') openBrowser(url);
  console.log(`Trading Terminal is running at ${url}\nStop it any time with: node scripts/stop.js`);
}
process.exitCode = port ? 0 : 1;
