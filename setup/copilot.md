# GitHub Copilot in VS Code

## Goal

Give a beginner an AI coding assistant inside VS Code without requiring a paid subscription.

Official GitHub guide:
https://docs.github.com/en/copilot/how-tos/manage-your-account/get-started-with-a-copilot-plan

Official plan page:
https://github.com/features/copilot/plans

## Copilot Free

A normal GitHub account can use **Copilot Free** when eligible. No credit card is required for the Free plan.

As of 2026-10-07, GitHub's public plan information lists:

- up to **2,000 code completions per month**;
- limited chat/agent usage (GitHub's current documentation also describes a 50-request Free allowance in the applicable request model);
- Copilot in VS Code;
- Copilot CLI.

GitHub is transitioning usage/accounting toward **GitHub AI Credits**, so an AI should verify the current plan page before quoting exact chat/agent limits to a student.

## Activate from VS Code

GitHub documents this flow:

1. open VS Code;
2. click the Copilot control in the top-right;
3. choose **Sign up for Copilot Free**;
4. sign into GitHub when prompted;
5. complete the Free activation.

If the student does not yet have a GitHub account, VS Code can send them through account creation.

## Copilot Student

A student verified through GitHub Education can activate **Copilot Student** for free.

Follow:
[github-education.md](github-education.md)

Do not tell an unverified student that they automatically have Student access simply because they attend a class.

## Use the handbook with Copilot

Do not require a long prompt before each coding request. Follow [agent.md](agent.md) to configure the tiny [bootstrap/AGENTS.md](../bootstrap/AGENTS.md) instructions in a supported project/user scope. Verify they are active and that Copilot can read the current https://github.com/KakkoiSchool/ai-handbook/blob/main/AGENTS.md router. When the network is unavailable, report that limitation instead of inventing current guidance.

## If free usage runs out

Do not automatically buy a plan.

The student can:

- wait for the allowance to reset;
- use another available free coding assistant/model;
- continue editing manually;
- if eligible, apply for Copilot Student.

A school lesson must not depend on paid AI usage to remain completable.
