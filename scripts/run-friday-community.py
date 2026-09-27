"""Friday-owned scheduler entrypoint. No credentials are committed or printed.
Configuration lives outside the repository in the default Hermes profile.
All schedules should use local delivery; pending-draft alerts use the worker's
verified, deduplicated Discord sender. Starts disabled until integration passes.
"""
from __future__ import annotations
import argparse
import json
import os
from pathlib import Path
import shutil
import subprocess
import sys


def run(mode: str, dry_run: bool = False) -> int:
    if mode not in {"doctor", "qa", "audit", "prepare"}:
        raise ValueError("Unknown community mode")
    config_path = Path(os.environ.get("FRIDAY_RUNTIME_CONFIG", str(Path.home() / "AppData/Local/hermes/community-friday.json")))
    config = json.loads(config_path.read_text(encoding="utf-8"))
    if not dry_run and mode != "doctor" and not config.get("enabled"):
        print("Friday community disabled; no model calls or writes.")
        return 0
    env = os.environ.copy()
    private = {}
    for line in Path(config["friday_env"]).read_text(encoding="utf-8").splitlines():
        if line.lstrip().startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        key = key.strip()
        if key not in {"OPENROUTER_API_KEY", "DISCORD_BOT_TOKEN"}:
            continue
        value = value.strip()
        if len(value) >= 2 and value[0] in "\"'" and value[-1] == value[0]:
            value = value[1:-1]
        private[key] = value
    env.update(private)
    env.update({
        "GOOGLE_APPLICATION_CREDENTIALS": config["credential_file"],
        "HERMES_PUBLIC_KNOWLEDGE_DIR": config["public_knowledge_dir"],
        "DISCORD_CHANNEL_ID": config["discord_channel_id"],
        "FRIDAY_MODEL": config["model"],
        "FRIDAY_ACTIVATED_AT": config["activated_at"],
        "FRIDAY_MAX_CALLS_PER_DAY": str(config.get("max_calls_per_day", 20)),
        "FRIDAY_ALLOW_PUBLISH": "true" if config.get("allow_publish") else "false",
        "FRIDAY_ADMIN_URL": "https://congdongai.org/quan-tri/friday/",
    })
    repo = Path(config["repo"])
    node = shutil.which("node")
    if not node:
        raise RuntimeError("Node.js is unavailable")
    # One worker at a time on this machine; process death releases the OS lock.
    lock = config_path.with_suffix(".lock").open("a+b")
    try:
        lock.seek(0)
        if os.name == "nt":
            import msvcrt
            try:
                msvcrt.locking(lock.fileno(), msvcrt.LK_NBLCK, 1)
            except OSError:
                print("Friday community already running; skipped.")
                return 0
        else:
            import fcntl
            try:
                fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
            except BlockingIOError:
                print("Friday community already running; skipped.")
                return 0
        commands = [[mode]]
        if mode == "qa":
            commands[0] += ["--max-drafts", "2"]
        if mode in {"qa", "audit"}:
            commands.append(["notify"])
        for args in commands:
            if mode != "doctor":
                args += ["--dry-run" if dry_run else "--execute"]
            result = subprocess.run([node, str(repo / "scripts/friday/cli.mjs"), *args], cwd=repo, env=env,
                                    capture_output=True, text=True, encoding="utf-8", errors="replace", timeout=540)
            output = (result.stdout + result.stderr)[-16000:]
            for secret in private.values():
                if secret:
                    output = output.replace(secret, "[REDACTED]")
            if output.strip():
                print(output, end="" if output.endswith("\n") else "\n")
            if result.returncode:
                return result.returncode
        return 0
    finally:
        lock.close()


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("mode", choices=["doctor", "qa", "audit", "prepare"])
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()
    try:
        sys.exit(run(args.mode, args.dry_run))
    except Exception as error:
        # No traceback or exception payload from credential/API internals.
        print(f"Friday community failed: {type(error).__name__}. Check runtime configuration.", file=sys.stderr)
        sys.exit(1)
