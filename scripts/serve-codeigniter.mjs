import { spawn } from 'node:child_process';
import { resolve } from 'node:path';

const cwd = resolve(import.meta.dirname, '../tests/fixtures/codeigniter-app');
const args = [
  '-c', 'php-runtime.ini',
  '-S', '127.0.0.1:4175',
  '-t', 'public',
  'vendor/codeigniter4/framework/system/rewrite.php',
];
const server = spawn('php', args, { cwd, stdio: 'inherit' });

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => server.kill(signal));
}

server.on('exit', (code) => process.exit(code ?? 0));
