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


## Mandatory APK download-link delivery protocol

When the user asks for an APK download, deliver the actual APK as a direct ChatGPT file attachment. A GitHub Actions run page is not a direct APK link.

1. Use the latest verified successful Actions run and its exact APK artifact ID. Select `basic-english-human-voice-apk`, never the similarly named audio-coverage report.
2. Download the artifact and inspect the returned file type and contents. GitHub Actions artifacts are ZIP archives; the APK inside is not automatically the same file as the wrapper ZIP.
3. Verify the wrapper ZIP integrity and confirm it contains the expected APK. Extract the APK to a real file.
4. Verify the APK itself: ZIP integrity, expected app assets, exactly 850 files under `assets/www/audio/words/`, and the new/changed feature assets relevant to this build. Record file size and SHA-256.
5. Copy the verified APK to a clear, unique path under `/mnt/data` using the user-visible file-generation tool (`python_user_visible`). In that same tool call, confirm the source exists, the copied file exists, its size and SHA-256 match, and its APK ZIP integrity passes.
6. Wait for the file-generation tool to return successfully. Only then write the user-facing Markdown link using the exact returned path, e.g. `[下载 APK](sandbox:/mnt/data/Exact-Verified-Name.apk)`. Never send a planned or guessed sandbox path before the file exists.
7. Do not use a temporary connector `download_url`, a connector file ID, or a GitHub Actions page as the primary direct-download link. Use the GitHub page only as a fallback or when the user explicitly requests it.
8. If the user reports failure, inspect the exact path and file in the current runtime; do not blindly repeat the same link. If needed, create a new uniquely named user-visible copy, verify it, wait for success, and then send that new exact link.
9. A successful build, artifact upload, or file copy does not prove the user successfully downloaded or installed it. Record these as separate states and wait for the user's confirmation before marking device acceptance.

Never claim that a download succeeded merely because a file exists on the assistant's side.

## Source of truth

- Delivery plan and current handoff: `AUDIO_BUILD_PLAN.md`.
- Workflow: `.github/workflows/build-android-offline.yml`.
- Audio source/download/build script: `scripts/build_human_word_audio.py`.

If these instructions conflict with a newer explicit user instruction, follow the user's instruction only after explaining any material risk, especially the risk of cancelling an active build.
