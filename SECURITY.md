# Security policy

Zoo Flow is a configuration template for [Zoo Code](https://docs.zoocode.dev/).
It does not ship runtime services, but it does shape how an AI assistant
behaves inside your workspace. Treat the modes, rules, and commands as
part of your security surface.

## Reporting a vulnerability

If you believe you have found a security issue in this template — for
example, a rule, command, or skill that could be used to exfiltrate secrets,
escalate file-system access beyond the documented bounds, or bypass the path
safety guarantees — please report it privately.

- Open a GitHub Security Advisory on the repository, or
- Email the maintainers listed on the repository's GitHub profile.

Do not file a public issue for security reports. Once we have a fix, we will
coordinate disclosure with you in the advisory.

## What is in scope

- The mode definitions in `templates/full/.roomodes`.
- The always-on rules under `templates/full/.roo/rules/`.
- Mode-scoped rules under `templates/full/.roo/rules-*`.
- The slash commands under `templates/full/.roo/commands/`.
- The skills under `templates/full/.roo/skills/`.

## What is out of scope

- Vulnerabilities in Zoo Code, the underlying model providers, or
  third-party tools the template references. Report those upstream.
- Issues that depend on a user manually disabling path-safety rules or
  removing the orchestrator's routing matrix.

## Handling secrets

This template never asks you to commit secrets. The `.gitignore` excludes
`.env`, `.env.*`, and local journals. Several skills explicitly require
redaction of API keys, credentials, and PII before producing output. If you
find a place in the template that pulls real credentials into context,
treat that as a security bug.
