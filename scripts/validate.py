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
    'skills/README.md', 'skills/serve/SKILL.md', 'skills/publish/SKILL.md',
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
for token in ['skills/serve/SKILL.md', 'skills/publish/SKILL.md', 'repeatable workflow']:
    if token.casefold() not in root.casefold():
        raise SystemExit('AGENTS.md missing skill routing/rule: ' + token)

serve = (ROOT / 'skills' / 'serve' / 'SKILL.md').read_text(encoding='utf-8')
if '--bind 127.0.0.1' not in serve:
    raise SystemExit('/serve must bind generic Python fallback to localhost')

publish = (ROOT / 'skills' / 'publish' / 'SKILL.md').read_text(encoding='utf-8')
for token in ['/serve PROJECT', '.env', 'gh api repos/OWNER/REPO/pages']:
    if token.casefold() not in publish.casefold():
        raise SystemExit('/publish missing safety/verification token: ' + token)

setup = (ROOT / 'setup' / 'README.md').read_text(encoding='utf-8')
if 'github-account.md' not in setup or 'gh auth login --web' not in setup:
    raise SystemExit('setup/README.md must cover account creation and safe GitHub auth')

for path in ['bootstrap/AGENTS.md', 'setup/agent.md', 'references/agent-behavior.md']:
    if not (ROOT / path).is_file():
        raise SystemExit('Required local-agent routing file missing: ' + path)
starter = (ROOT / 'bootstrap/AGENTS.md').read_text(encoding='utf-8')
if len(starter.encode('utf-8')) > 950:
    raise SystemExit('Local starter must remain <=950 bytes')
for word in ['github.com/KakkoiSchool/ai-handbook/blob/main/AGENTS.md', '日本語', 'language', 'Verify']:
    if word.casefold() not in starter.casefold():
        raise SystemExit('Local starter missing ' + word)
for path in ['README.md', 'AGENTS.md', 'setup/agent.md']:
    if 'bootstrap/AGENTS.md' not in (ROOT / path).read_text(encoding='utf-8'):
        raise SystemExit(path + ' lacks the starter reference')
if '[agent.md](agent.md)' not in setup:
    raise SystemExit('First-day setup must include local agent install')
print('ai-handbook routing and tiny starter validation: OK')
