from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

required = [
    'README.md', 'AGENTS.md', 'llms.txt',
    'setup/README.md', 'setup/github-account.md', 'setup/git.md',
    'setup/vscode.md', 'setup/vscode-github.md', 'setup/copilot.md',
    'setup/live-server.md', 'setup/local-server.md', 'setup/github-education.md',
    'setup/check-setup.sh', 'setup/check-setup.ps1', 'setup/first-project.md',
    'recipes/README.md', 'recipes/games.md', 'recipes/github-cli.md',
    'recipes/create-repository.md', 'recipes/delete-repository.md',
    'recipes/github-pages.md', 'recipes/multiplayer.md',
    'recipes/browser-fallback.md',
    'browser/package.json',
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

root = (ROOT / 'AGENTS.md').read_text(encoding='utf-8')
if 'https://github.com/KilledByAPixel/LittleJS-AI' not in root:
    raise SystemExit('AGENTS.md must route browser games to LittleJS-AI')

setup = (ROOT / 'setup' / 'README.md').read_text(encoding='utf-8')
if 'github-account.md' not in setup or 'gh auth login --web' not in setup:
    raise SystemExit('setup/README.md must cover account creation and safe GitHub auth')

print('ai-handbook routing validation: OK')
