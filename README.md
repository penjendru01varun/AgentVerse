<a name="readme-top"></a>

<div align="center">
  <h1 align="center" style="border-bottom: none; font-size: 3rem; letter-spacing: -1px;">✌️ VAgent</h1>
  <p align="center">
    <strong>The self-hosted developer control center for coding agents and automations.</strong>
  </p>
  <p align="center">
    Run VAgent, Claude Code, Codex, Gemini, or any ACP-compatible agent across local, remote, and cloud backends.
  </p>
</div>
<div align="center">
  <a href="https://github.com/VAgent-all/VAgent"><img src="https://img.shields.io/badge/status-beta-blue?style=for-the-badge" alt="Project status beta"></a>
  <a href="https://github.com/VAgent-all/VAgent/actions/workflows/ci.yml"><img src="https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge" alt="CI status"></a>
  <a href="https://www.npmjs.com/package/@vagent/agent-canvas"><img src="https://img.shields.io/badge/npm-VAgent-red?style=for-the-badge&logo=npm" alt="npm version"></a>
  <a href="https://VAgent-all.dev/docs"><img src="https://img.shields.io/badge/Documentation-000?logo=googledocs&logoColor=FFE165&style=for-the-badge" alt="Documentation"></a>
  <a href="https://VAgent-all.dev/slack"><img src="https://img.shields.io/badge/Slack-Join%20the%20community-611f69?logo=slack&logoColor=white&style=for-the-badge" alt="Join us on Slack"></a>
</div>
<div align="center">
  <a href="#quickstart">Quickstart</a> |
  <a href="./docs/README.md">Docs</a> |
  <a href="./docs/SELF_HOSTING.md">Self-Hosting</a> |
  <a href="https://VAgent-all.dev/docs/acp-agents">ACP Agents</a> |
  <a href="https://VAgent-all.dev/docs/automations">Automations</a> |
  <a href="https://VAgent-all.dev/slack">Slack</a>
</div>
<hr>

VAgent turns your coding agents into a self-hosted, always-on engineering team. It's a developer control center for starting conversations and automating everyday tasks — like generating reports that publish to Slack or automatically decomposing GitHub issues into tasks.

It runs locally on your machine by default, but can connect to multiple "agent backends", e.g. running agents in Docker containers, on VMs, or within your company infrastructure. You can optionally choose to run agents on VAgent Cloud or VAgent Enterprise infrastructure.

VAgent runs the open source VAgent coding assistant out-of-the-box, but can use any third-party agent like Claude Code and Codex.

|                                                                                     |                                                                                                                                          |
| ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**Self-host your way**](https://VAgent-all.dev/docs/backend-setup/vm)              | Run agents locally, in Docker, on VMs, or anywhere you can run an agent server backend                                                   |
| [**Switch between different backends**](https://VAgent-all.dev/docs/backends)       | Switch between local, remote, and cloud agents without losing focus                                                                      |
| [**Create automations**](https://VAgent-all.dev/docs/automations)                   | Create automations and workflows that integrate with Slack, GitHub, Linear, and more. Run on a schedule or in response to webhook events |
| [**Integrate with the tools you use**](https://VAgent-all.dev/docs/automations)     | Connect your automations with third-party services like Slack, GitHub, Notion, and more to automate workflows                            |
| [**Bring your own model**](https://VAgent-all.dev/docs/settings/llm-settings)       | Use with any LLM                                                                                                                         |
| [**Use with any agent**](https://VAgent-all.dev/docs/acp-agents)                    | Use with VAgent, Claude Code, Codex, Gemini, or any agent with Agent-Client Protocol (ACP).                                              |

If you have questions or feedback, please open a GitHub issue or join the [#proj-vagent channel in Slack](https://VAgent-all.dev/joinslack).

## Quickstart

You can install VAgent to run agents on any machine: on your laptop, on a dedicated computer like a Mac Mini,
or on a server in the cloud.

The most powerful way to run VAgent is on a server in the cloud. This allows your agents to continue running
even when your laptop is shut, and makes it easier to trigger your agents through third-party services
like Slack, GitHub, and Datadog. See [SELF_HOSTING.md](docs/SELF_HOSTING.md) for details, especially with respect to security hardening.

Notably, you can run the backend in _multiple different environments_, and switch between
them from the same VAgent frontend. E.g. you can share an Agent Server with your team for agents doing
code review and dependency updates, then have your personal agents running on your laptop.

### Option 1: Without a Sandbox

> [!WARNING]
> This runs the agent-server directly on the machine you're installing on — the agent will have full access to your filesystem!

**Prerequisites**: Node.js 22.12.x or later, `uv`

```sh
npm install -g @vagent/agent-canvas
agent-canvas
```

The `agent-canvas` command starts the full local stack by default. You can also split it when you want to run pieces separately:

```sh
agent-canvas --frontend-only  # static frontend + ingress only
agent-canvas --backend-only   # agent server + automation backend + ingress only
```

### Option 2: With a Docker Sandbox

**Prerequisites**:

- Docker: Docker Desktop on macOS/Windows, or Docker Engine/Docker Desktop on Linux.
- A host directory for `PROJECTS_PATH` containing the project folders you want the agent to access. Create it before starting the container.

**macOS / Linux:**

```sh
export PROJECTS_PATH="$HOME/projects"  # directory containing your project folders
mkdir -p "$PROJECTS_PATH" "$HOME/.vagent"

docker run -it --rm \
  -p 8000:8000 \
  -v "$HOME/.vagent:/home/vagent/.vagent" \
  -v "${PROJECTS_PATH}:/projects" \
  ghcr.io/vagent/agent-canvas:1.10.0
```

**Windows (PowerShell / Windows Terminal):** See [README.windows.md](./README.windows.md) for the equivalent commands.

The agent will be able to access any project under `PROJECTS_PATH`.

### Option 3: From Source

> [!WARNING]
> This runs the agent-server directly on the machine you're installing on — the agent will have full access to your filesystem!

**Prerequisites**: Node.js 22.12.x or later, `npm`, `uv` (for running the agent server via `uvx`)

```sh
git clone https://github.com/VAgent-all/VAgent.git
cd VAgent
npm install
npm run dev
```

---

Access the UI at [http://localhost:8000](http://localhost:8000) for the npm/source launchers, or [http://localhost:8000/canvas](http://localhost:8000/canvas) for the Docker image. You can add additional backends directly from the UI.

# Architecture

VAgent is powered by the [VAgent Server](https://github.com/VAgent-all/VAgent/tree/main/vagent-server), a REST API for running multiple agents on a single machine. Each VAgent Server runs on a single host/port; VAgent can connect to multiple VAgent Servers and easily flip between them.

You can run an Agent Server anywhere:

- Directly on your laptop (be careful!)
- On a dedicated machine like a Mac Mini
- On a virtual machine in the cloud
- Inside VAgent Cloud (our commercial offering)

The Agent Server is often paired with an [Automation Server](https://github.com/VAgent-all/automation), which lets you set up agents that run on a schedule or in response to events.

<img width="1456" height="1258" alt="image" src="https://github.com/user-attachments/assets/cb6de6f5-ac30-4d04-a76a-b5c259f0c163" />

## More documentation

- [Documentation index](./docs/README.md)
- [Architecture overview](./docs/architecture.md)
- [Development guide](./docs/DEVELOPMENT.md)
- [Self-hosting guide](./docs/SELF_HOSTING.md)

---

## ✌️ VAgent Extensions

VAgent is the self-hosted developer control center for AI coding agents and automations. Below is the official extensions catalog.

### Skills overview

Skills are Markdown-based guidelines that provide domain-specific knowledge and instructions to agents.

- Skills docs: [https://VAgent-all.dev/docs/skills](https://VAgent-all.dev/docs/skills)
- SDK skill guide: [https://VAgent-all.dev/sdk/guides/skill](https://VAgent-all.dev/sdk/guides/skill)

### Extensions Catalog

This repository contains **64 extensions** (54 skills, 10 plugins) across 2 marketplaces.

---

## 👤 Author & Copyright

**Author:** Penjendru Varun

**Copyright © 2025 Penjendru Varun. All rights reserved.**

VAgent is built and maintained by Penjendru Varun. Unauthorized reproduction or distribution of this software, or any portion of it, may result in severe civil and criminal penalties.

> This project was originally forked from OpenHands by All Hands AI and has been substantially modified, rebranded, and extended by Penjendru Varun as **VAgent**.

### Contributors

| Name | Role |
|------|------|
| **Penjendru Varun** | Creator, Lead Developer & Maintainer |

### Contact

- 📧 Email: varun@VAgent-all.dev
- 🌐 Website: [https://VAgent-all.dev](https://VAgent-all.dev)
- 💬 Slack: [https://VAgent-all.dev/slack](https://VAgent-all.dev/slack)
STING.md)
