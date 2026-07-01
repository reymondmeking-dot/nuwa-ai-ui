#!/usr/bin/env node
// nuwa-ai-ui — cross-platform (macOS / Linux / Windows) CLI wrapper
// Author: ReyMao. License: MIT.
//
// Subcommands:
//   nuwa-ai-ui dev         Start Vite dev server
//   nuwa-ai-ui build       Type-check + Vite production build
//   nuwa-ai-ui preview     Preview the production build
//   nuwa-ai-ui typecheck   Run `tsc --noEmit`
//   nuwa-ai-ui deploy      Upload dist/ to server via deploy_to_server.py
//                          (requires NUWA_DEPLOY_HOST/USER/REMOTE and
//                           NUWA_DEPLOY_PASSWORD or NUWA_DEPLOY_KEY)
//   nuwa-ai-ui --help      Show this help

import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import process from 'node:process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '..');

const IS_WIN = process.platform === 'win32';

function help() {
  console.log(`nuwa-ai-ui — NUWA AI UI project CLI

Usage:
  nuwa-ai-ui <command>

Commands:
  dev         Start the Vite dev server (host 0.0.0.0)
  build       Run tsc --noEmit and then vite build
  preview     Preview the built site (host 0.0.0.0)
  typecheck   Run TypeScript type checking (tsc --noEmit)
  deploy      Build and upload dist/ via deploy_to_server.py

Options:
  -h, --help  Show this help

Environment variables required for 'deploy':
  NUWA_DEPLOY_HOST       SSH host / IP of the target server
  NUWA_DEPLOY_USER       SSH username
  NUWA_DEPLOY_REMOTE     Remote directory to upload into
  NUWA_DEPLOY_PASSWORD   SSH password  (either this or NUWA_DEPLOY_KEY)
  NUWA_DEPLOY_KEY        Path to SSH private key (preferred)
  NUWA_DEPLOY_PORT       Optional SSH port (default 22)
`);
}

/**
 * Map of bin-name -> containing npm package. We know exactly what we ship,
 * so this is faster and safer than symlink chasing.
 */
const BIN_TO_PACKAGE = {
  vite: 'vite',
  tsc: 'typescript',
};

/**
 * Resolve a package's real JS entry (its "bin" script) so we can run it
 * with Node directly and skip the platform-specific .cmd/.sh shims.
 * Falls back to node_modules/.bin/<name>[.cmd] if the package layout
 * is non-standard.
 */
function resolveBin(name) {
  // Preferred: read the owning package's package.json and follow its "bin" field.
  // Works identically on macOS, Linux, and Windows.
  const pkgName = BIN_TO_PACKAGE[name] ?? name;
  const pkgPath = join(ROOT, 'node_modules', pkgName, 'package.json');
  if (existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
      let binRel = null;
      if (typeof pkg.bin === 'string') {
        binRel = pkg.bin;
      } else if (pkg.bin && typeof pkg.bin === 'object') {
        binRel = pkg.bin[name] ?? Object.values(pkg.bin)[0] ?? null;
      }
      if (binRel) {
        const abs = resolve(dirname(pkgPath), binRel);
        if (existsSync(abs)) return { kind: 'node', path: abs };
      }
    } catch {
      // fall through to shim lookup
    }
  }

  // Fallback: node_modules/.bin shim
  const binDir = join(ROOT, 'node_modules', '.bin');
  const candidates = IS_WIN
    ? [`${name}.cmd`, `${name}.CMD`, `${name}.exe`, name]
    : [name];
  for (const c of candidates) {
    const p = join(binDir, c);
    if (existsSync(p)) return { kind: 'shim', path: p };
  }
  return null;
}

function run(cmd, args, opts = {}) {
  const result = spawnSync(cmd, args, {
    stdio: 'inherit',
    cwd: ROOT,
    ...opts,
  });
  if (result.error) {
    console.error(`[nuwa-ai-ui] failed to spawn ${cmd}: ${result.error.message}`);
    process.exit(1);
  }
  return result.status ?? 0;
}

function runBin(name, args) {
  const bin = resolveBin(name);
  if (!bin) {
    console.error(
      `[nuwa-ai-ui] cannot find "${name}" in node_modules. ` +
      `Did you run "npm install"?`
    );
    process.exit(1);
  }
  let status;
  if (bin.kind === 'node') {
    // Run the JS entry with the current Node — no shell, no shim, no deprecation warning.
    status = run(process.execPath, [bin.path, ...args]);
  } else {
    // Fallback: run the shim. On Windows .cmd files need a shell.
    status = run(bin.path, args, { shell: IS_WIN });
  }
  if (status !== 0) process.exit(status);
}

function cmdDev() {
  runBin('vite', ['--host', '0.0.0.0']);
}

function cmdBuild() {
  runBin('tsc', ['--noEmit']);
  runBin('vite', ['build']);
}

function cmdPreview() {
  runBin('vite', ['preview', '--host', '0.0.0.0']);
}

function cmdTypecheck() {
  runBin('tsc', ['--noEmit']);
}

function cmdDeploy() {
  const required = ['NUWA_DEPLOY_HOST', 'NUWA_DEPLOY_USER', 'NUWA_DEPLOY_REMOTE'];
  const missing = required.filter((k) => !process.env[k]);
  if (missing.length > 0) {
    console.error('[nuwa-ai-ui] deploy: missing required environment variable(s): ' + missing.join(', '));
    console.error('  Please export them first. See README.md → 部署说明.');
    process.exit(2);
  }
  if (!process.env.NUWA_DEPLOY_PASSWORD && !process.env.NUWA_DEPLOY_KEY) {
    console.error('[nuwa-ai-ui] deploy: neither NUWA_DEPLOY_PASSWORD nor NUWA_DEPLOY_KEY is set.');
    process.exit(2);
  }
  const script = join(ROOT, 'deploy_to_server.py');
  if (!existsSync(script)) {
    console.error(`[nuwa-ai-ui] deploy: ${script} not found.`);
    console.error('  This script is gitignored and must be present locally.');
    process.exit(3);
  }
  const python = IS_WIN ? 'python' : 'python3';
  const status = run(python, [script]);
  if (status !== 0) process.exit(status);
}

function main() {
  const argv = process.argv.slice(2);
  const cmd = argv[0];
  if (!cmd || cmd === '-h' || cmd === '--help' || cmd === 'help') {
    help();
    return;
  }
  switch (cmd) {
    case 'dev':       return cmdDev();
    case 'build':     return cmdBuild();
    case 'preview':   return cmdPreview();
    case 'typecheck': return cmdTypecheck();
    case 'deploy':    return cmdDeploy();
    default:
      console.error(`[nuwa-ai-ui] unknown command: ${cmd}\n`);
      help();
      process.exit(64);
  }
}

main();
