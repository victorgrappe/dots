#!/usr/bin/env bash

REMOTE_DIR="${HOME}/Library/Mobile Documents/iCloud~md~obsidian/Documents/victor"
WHITELIST_PATH="./vault/victor/whitelist.txt"

#echo "Remote dir:       ${REMOTE_DIR}"
#echo "Whitelist path:   ${WHITELIST_PATH}"



#cat "${REMOTE_DIR}/dot/Dot.md"


rsync \
  --archive \
  --verbose \
  --dry-run \
  --human-readable \
  --itemize-changes \
  --include-from="${WHITELIST_PATH}" \
  --exclude='*' \
  "${HOME}/Library/Mobile Documents/iCloud~md~obsidian/Documents/victor/" \
  ./                                                                                                                                                                                                                                                                                                                                                                                      

