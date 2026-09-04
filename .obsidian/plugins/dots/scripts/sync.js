// Mirrors vault/victor/import.sh in JS via rsync.
// Usage in a note:
//   ```dots
//   sync            <- dry run (default)
//   ```
//   ```dots
//   sync apply      <- actually write
//   ```
module.exports = async function sync(mode = 'dry') {
  const { execFile } = require('child_process');
  const path = require('path');

  const vaultPath = app.vault.adapter.getBasePath();
  const remoteDir = path.join(
    process.env.HOME,
    'Library/Mobile Documents/iCloud~md~obsidian/Documents/victor',
  );
  const whitelist = path.join(vaultPath, 'vault/victor/whitelist.txt');
  const apply = mode === 'apply';

  const args = [
    '--archive',
    '--verbose',
    '--human-readable',
    '--itemize-changes',
    `--include-from=${whitelist}`,
    '--exclude=*',
    `${remoteDir}/`,
    './',
  ];
  if (!apply) args.unshift('--dry-run');

  const { stdout, stderr, code } = await new Promise((resolve) => {
    execFile('rsync', args, { cwd: vaultPath }, (err, stdout, stderr) => {
      resolve({ stdout, stderr, code: err ? err.code : 0 });
    });
  });

  return [
    `[${apply ? 'APPLY' : 'DRY-RUN'}] rsync exit ${code}`,
    stdout.trim(),
    stderr && `[stderr]\n${stderr.trim()}`,
  ]
    .filter(Boolean)
    .join('\n\n');
};
