from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
required = [
    'README.md', 'AGENTS.md', 'llms.txt',
    'recipes/github-cli.md', 'recipes/create-repository.md',
    'recipes/delete-repository.md', 'recipes/github-pages.md',
    'recipes/browser-fallback.md', 'browser/package.json',
    'setup/README.md', 'setup/github-account.md', 'setup/git.md',
    'setup/vscode.md', 'setup/vscode-github.md', 'setup/copilot.md',
    'setup/live-server.md', 'setup/local-server.md',
]
missing = [p for p in required if not (ROOT / p).exists()]
if missing:
    raise SystemExit('Missing required files: ' + ', '.join(missing))

for p in (ROOT / 'recipes').glob('*.md'):
    text = p.read_text(encoding='utf-8')
    if p.name != 'README.md' and '## Goal' not in text:
        raise SystemExit(f'{p}: missing ## Goal')

for name in ['delete-repository.md', 'change-visibility.md', 'transfer-repository.md']:
    text = (ROOT / 'recipes' / name).read_text(encoding='utf-8').lower()
    if not any(word in text for word in ['destructive', 'high-impact', 'explicit']):
        raise SystemExit(f'{name}: destructive action warning missing')

print('ai-handbook validation: OK')
