# Codex Switch

<p align="center">
  <img src="src-tauri/icons/icon.png" width="96" alt="Codex Switch logo">
</p>

<p align="center">
  English | <a href="README.md">简体中文</a>
</p>

<p align="center">
  <a href="https://github.com/qiyadeng/CodexSwitch/releases/latest">
    <img alt="Latest release" src="https://img.shields.io/github/v/release/qiyadeng/CodexSwitch?style=flat-square">
  </a>
  <a href="https://github.com/qiyadeng/CodexSwitch/releases">
    <img alt="Downloads" src="https://img.shields.io/github/downloads/qiyadeng/CodexSwitch/total?style=flat-square">
  </a>
  <img alt="Platform" src="https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-38bdf8?style=flat-square">
</p>

Codex Switch is a local-first desktop control center for managing AI coding tools such as Codex, Antigravity, Cursor, Windsurf, Kiro, GitHub Copilot, Gemini CLI, CodeBuddy, Qoder, Trae, and Zed.

It is built for people who move between multiple accounts, projects, instances, and AI coding tools every day. Codex Switch brings account status, quota tracking, app launch paths, workspace entries, refresh rules, and update checks into one focused desktop app.

## Highlights

- Multi-tool account management: view and switch accounts for Codex, Antigravity, Cursor, Windsurf, Kiro, GitHub Copilot, and more.
- Codex-focused workflow: account groups, instance management, quota refresh, quota alerts, and launch-on-switch support.
- Instance and workspace hub: keep tool-specific project entries close at hand.
- Local-first by design: core settings stay on your machine and are not uploaded to a project-owned server.
- Auto updates: desktop releases are distributed through GitHub Releases with Tauri updater metadata.
- Multilingual UI: includes Chinese, English, Japanese, Korean, German, French, Spanish, and more.

## Download

Download the latest build from [GitHub Releases](https://github.com/qiyadeng/CodexSwitch/releases/latest).

| Platform | Recommended package |
| --- | --- |
| Windows | `.exe` / `.msi` |
| macOS | `.dmg` |
| Linux | `.AppImage` / `.deb` / `.rpm` |

On macOS, if the first launch is blocked by system security, allow the app in System Settings > Privacy & Security, or follow the release notes to remove the quarantine attribute.

## Screenshots

![Dashboard overview](docs/images/dashboard_overview.png)

![Codex accounts](docs/images/codex_list.png)

![Settings](docs/images/settings_page.png)

## Development

```bash
npm install
npm run dev
```

Common checks:

```bash
npm run typecheck
npm run build
```

Regenerate desktop icons:

```bash
python scripts/generate_app_icons.py
```

## Release And Updates

Codex Switch is built with Tauri 2 and distributed through GitHub Releases. Before publishing a new version, make sure:

- `package.json`, `src-tauri/tauri.conf.json`, and `src-tauri/Cargo.toml` use the same version.
- Release assets include the platform installers you want to ship.
- `latest.json` points to the current version and contains a valid signature.

## Privacy

Codex Switch is designed around local management and local switching. The app does not upload account lists, path settings, or usage preferences to a project-owned server. Network behavior from third-party AI coding tools is still controlled by those tools and their providers.

## Credits

This project continues from the original Cockpit Tools project. Thanks to the original author and community contributors.

## License

This project is licensed under `CC-BY-NC-SA-4.0`. Commercial use requires separate written permission.
