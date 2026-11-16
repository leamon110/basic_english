# Mandatory instructions for AI assistants working in this repository

This repository contains an ongoing delivery task: the Basic English offline Android APK with 850 locally packaged human word recordings.

## Mandatory session-start procedure

Before answering a request that continues this task, inspecting implementation details, changing files, starting/cancelling/rerunning a build, or claiming progress:

1. Read the entire `AUDIO_BUILD_PLAN.md`. Do not rely on a previous chat, memory, a filename, or an old status copied from a conversation.
2. Query GitHub for the current head of branch `basic-english-learning-upgrade`.
3. Query the latest GitHub Actions runs for that branch. Inspect the newest run's status, commit SHA, job steps, logs where needed, and artifacts.
4. If a run is active, check its concurrency behavior before doing anything that could trigger another run. The current workflow has `cancel-in-progress: true`; a push to a watched path or a new run can cancel the active build. Do not trigger a competing run or modify watched paths while it is active unless the user explicitly directs that action after the risk is explained.
5. Compare live facts with the status snapshot in `AUDIO_BUILD_PLAN.md`. Treat the live GitHub state as authoritative. A status recorded in the plan is historical once a newer run or commit exists.
6. State the verified current position and the next concrete action. If GitHub cannot be inspected, say so and do not guess.

Do not skip this procedure even if the user says only "continue", "继续", or asks a short progress question.

## Mandatory execution and reporting rules

- Do not equate 850 matched source records with 850 downloaded and validated audio files.
- Do not equate a successful script step with a successful APK.
- Do not report delivery until every acceptance criterion in `AUDIO_BUILD_PLAN.md` is verified, including APK contents, artifact upload, and local human-audio playback checks.
- Preserve the existing app baseline and user-facing behavior. Clearly distinguish existing functionality from changes being introduced.
- Do not replace the selected audio source strategy mid-run without first inspecting the current run and documenting the reason.
- Never discard partial downloads without checking whether they were persisted in the Actions cache.
- After each verified milestone, update `AUDIO_BUILD_PLAN.md` with exact counts, run ID, commit SHA, cache outcome, artifact status, blockers, and next action.
- Before ending a work session, update the handoff section in `AUDIO_BUILD_PLAN.md`. Never write an unverified status as fact.

## Source of truth

- Delivery plan and current handoff: `AUDIO_BUILD_PLAN.md`.
- Workflow: `.github/workflows/build-android-offline.yml`.
- Audio source/download/build script: `scripts/build_human_word_audio.py`.

If these instructions conflict with a newer explicit user instruction, follow the user's instruction only after explaining any material risk, especially the risk of cancelling an active build.
