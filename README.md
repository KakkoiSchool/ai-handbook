# Kakkoi School AI Handbook

This repository is the **single entry point for Kakkoi School coding assistants**.

A student should only need to give their AI this URL:

https://github.com/KakkoiSchool/ai-handbook

Then describe what they want.

For example:

> Read the Kakkoi School handbook and help me set up this computer.

> Read the Kakkoi School handbook and make me a browser game.

> Read the Kakkoi School handbook and publish my site with GitHub Pages.

The student does **not** need to know which tool, framework, recipe, or external documentation is required.

## For AI assistants

Read [AGENTS.md](AGENTS.md).

It is a flat router:

    student request
          ↓
       AGENTS.md
          ↓
    actual authoritative instructions

Examples:

    setup          → setup/README.md
    GitHub Pages   → recipes/github-pages.md
    browser game   → LittleJS-AI
    multiplayer    → p2p-core
    create repo    → recipes/create-repository.md

Do not make the student navigate documentation themselves. Determine the task and route directly to the matching instructions.

## Why

Kakkoi School should not duplicate documentation maintained by another project.

For example, game creation is already documented for coding AIs by the official LittleJS project, so the router sends game work directly to:

https://github.com/KilledByAPixel/LittleJS-AI

Likewise, multiplayer work routes directly to:

https://github.com/KakkoiDev/p2p-core

Kakkoi School only maintains instructions that are actually Kakkoi-specific or need a stable student workflow.

## 日本語

学生はこのURLだけをAIに渡せば大丈夫です：

https://github.com/KakkoiSchool/ai-handbook

あとは、やりたいことを普通に伝えてください。

例：

> このKakkoi Schoolのハンドブックを読んで、パソコンのセットアップを手伝ってください。

> このKakkoi Schoolのハンドブックを読んで、ブラウザゲームを作ってください。

> このKakkoi Schoolのハンドブックを読んで、GitHub Pagesで公開してください。

AIが必要な手順や公式ドキュメントを自分で選びます。
