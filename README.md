# dots-md

## Import

```bash

bash ./vault/victor/import.sh


LOCAL_DIR="${HOME}/Library/Mobile Documents/iCloud~md~obsidian/Documents/dots-md"
REMOTE_DIR="${HOME}/Library/Mobile Documents/iCloud~md~obsidian/Documents/victor"

ls -la "${REMOTE_DIR}/dot"


rsync -avn --include-from=sync/whitelist.txt --exclude='*' ~/.claude/ ./
```
