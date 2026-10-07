#!/bin/sh
set -u

ok=1

check() {
  label="$1"
  shift
  if "$@" >/dev/null 2>&1; then
    printf 'OK   %s\n' "$label"
  else
    printf 'MISS %s\n' "$label"
    ok=0
  fi
}

check "Git" git --version
check "GitHub CLI" gh --version

if command -v gh >/dev/null 2>&1; then
  if gh auth status >/dev/null 2>&1; then
    printf 'OK   GitHub authentication\n'
  else
    printf 'MISS GitHub authentication (run: gh auth login --web)\n'
    ok=0
  fi
fi

name=$(git config --global user.name 2>/dev/null || true)
email=$(git config --global user.email 2>/dev/null || true)

if [ -n "$name" ]; then
  printf 'OK   Git name: %s\n' "$name"
else
  printf 'MISS Git name\n'
  ok=0
fi

if [ -n "$email" ]; then
  printf 'OK   Git email configured\n'
else
  printf 'MISS Git email\n'
  ok=0
fi

if [ "$ok" -eq 1 ]; then
  printf '\nREADY: this computer is prepared for Kakkoi School Git/GitHub work.\n'
else
  printf '\nNOT READY: follow recipes/student-setup.md for the missing items.\n'
  exit 1
fi
