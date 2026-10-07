import json
import sys
from pathlib import Path

if len(sys.argv) != 4:
    raise SystemExit("usage: score.py cases.json CASE_ID response.txt")

cases = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
case = next((c for c in cases if c["id"] == sys.argv[2]), None)
if not case:
    raise SystemExit(f"unknown case: {sys.argv[2]}")

answer = Path(sys.argv[3]).read_text(encoding="utf-8")
lower = answer.lower()

missing = [x for x in case["must"] if x.lower() not in lower]
forbidden = [x for x in case["must_not"] if x.lower() in lower]

passed = not missing and not forbidden
print(json.dumps({
    "case": case["id"],
    "recipe": case["recipe"],
    "pass": passed,
    "required_found": len(case["must"]) - len(missing),
    "required_total": len(case["must"]),
    "missing": missing,
    "forbidden_found": forbidden
}, ensure_ascii=False, indent=2))

raise SystemExit(0 if passed else 1)
