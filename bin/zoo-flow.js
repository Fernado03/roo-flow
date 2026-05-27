#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageRoot = path.resolve(__dirname, "..");
const templateRoot = path.join(packageRoot, "templates", "full");

const command = process.argv[2];

const HELP = `
Zoo Flow

Usage:
  npx @fernado03/zoo-flow@latest init
  npx @fernado03/zoo-flow@latest init --force
  npx @fernado03/zoo-flow@latest update
  npx @fernado03/zoo-flow@latest update --dry-run
  npx @fernado03/zoo-flow@latest update --force
  npx @fernado03/zoo-flow@latest doctor --template-only

Commands:
  init              Install Zoo Flow into the current project
  update            Back up current config and copy the latest template
  doctor            Validate the bundled template

Options:
  --force           Overwrite existing .roomodes and .roo after backup
  --dry-run         Print what update would do without changing files
  --template-only   Validate this package's template instead of current project
`;

function exitWithError(message) {
  console.error(`\nError: ${message}\n`);
  process.exit(1);
}

function pathExists(targetPath) {
  return fs.existsSync(targetPath);
}

function copyRecursive(src, dest) {
  if (!pathExists(src)) {
    throw new Error(`Missing source: ${src}`);
  }

  const stat = fs.statSync(src);

  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });

    for (const entry of fs.readdirSync(src)) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }

    return;
  }

  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function removeRecursive(targetPath) {
  if (!pathExists(targetPath)) return;
  fs.rmSync(targetPath, { recursive: true, force: true });
}

function backupIfExists(projectRoot, backupDir, relativePath) {
  const src = path.join(projectRoot, relativePath);

  if (!pathExists(src)) {
    return false;
  }

  const dest = path.join(backupDir, relativePath);
  copyRecursive(src, dest);
  return true;
}

function makeTimestamp() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    throw new Error(`Invalid JSON: ${filePath}\n${error.message}`);
  }
}

function walkFiles(rootDir) {
  const files = [];

  function walk(current) {
    if (!pathExists(current)) return;

    const stat = fs.statSync(current);

    if (stat.isDirectory()) {
      for (const entry of fs.readdirSync(current)) {
        if (entry === ".git" || entry === "node_modules") continue;
        walk(path.join(current, entry));
      }
      return;
    }

    files.push(current);
  }

  walk(rootDir);
  return files;
}

function validateTemplate(rootDir) {
  const roomodesPath = path.join(rootDir, ".roomodes");
  const rooDir = path.join(rootDir, ".roo");
  const commandsDir = path.join(rooDir, "commands");
  const skillsDir = path.join(rooDir, "skills");
  const rulesDir = path.join(rooDir, "rules");

  const failures = [];

  if (!pathExists(roomodesPath)) failures.push("Missing .roomodes");
  if (!pathExists(rooDir)) failures.push("Missing .roo/");
  if (!pathExists(commandsDir)) failures.push("Missing .roo/commands/");
  if (!pathExists(skillsDir)) failures.push("Missing .roo/skills/");
  if (!pathExists(rulesDir)) failures.push("Missing .roo/rules/");

  if (pathExists(roomodesPath)) {
    try {
      const parsed = readJson(roomodesPath);
      if (!Array.isArray(parsed.customModes)) {
        failures.push(".roomodes must contain customModes array");
      }
    } catch (error) {
      failures.push(error.message);
    }
  }

  // Validate skill-wrapper command references. Each command file in
  // .roo/commands/ may either declare a skill via `Skill:
  // .roo/skills/.../SKILL.md` (skill-wrapper command) or contain its
  // workflow steps directly. Direct-workflow commands are valid; we only
  // verify referenced skills exist.
  if (pathExists(commandsDir)) {
    const skillRefRegex = /^Skill:\s*`?(\.roo\/skills\/[^\s`]+SKILL\.md)`?\s*$/m;

    for (const entry of fs.readdirSync(commandsDir)) {
      if (!entry.endsWith(".md")) continue;

      const commandFile = path.join(commandsDir, entry);
      const text = fs.readFileSync(commandFile, "utf8");
      const match = text.match(skillRefRegex);

      if (!match) continue;

      const skillRelative = match[1];
      const skillAbsolute = path.join(rootDir, skillRelative);

      if (!pathExists(skillAbsolute)) {
        failures.push(
          `Command ${path.relative(rootDir, commandFile)} references missing skill: ${skillRelative}`
        );
      }
    }
  }

  const allFiles = walkFiles(rootDir);
  const textFileExtensions = new Set([".md", ".json", ".txt", ".yaml", ".yml"]);

  for (const file of allFiles) {
    const ext = path.extname(file);
    if (!textFileExtensions.has(ext)) continue;

    const text = fs.readFileSync(file, "utf8");

    const badPatterns = [
      ".roo/skills///SKILL.md",
      ".roo/commands/.md",
      "your-org/roo-flow",
      ".zoo/"
    ];

    for (const pattern of badPatterns) {
      if (text.includes(pattern)) {
        failures.push(`Bad pattern "${pattern}" in ${path.relative(rootDir, file)}`);
      }
    }
  }

  const requiredRules = [
    ".roo/rules/00-paths.md",
    ".roo/rules/01-command-protocol.md",
    ".roo/rules/03-manual-reply-protocol.md"
  ];

  for (const rule of requiredRules) {
    if (!pathExists(path.join(rootDir, rule))) {
      failures.push(`Missing required global rule: ${rule}`);
    }
  }

  const requiredModeRules = [
    ".roo/rules-code-tweaker",
    ".roo/rules-system-architect",
    ".roo/rules-custom-orchestrator"
  ];

  for (const ruleDir of requiredModeRules) {
    if (!pathExists(path.join(rootDir, ruleDir))) {
      failures.push(`Missing mode rule folder: ${ruleDir}`);
    }
  }

  return failures;
}

function install() {
  const args = new Set(process.argv.slice(3));
  const force = args.has("--force");
  const projectRoot = process.cwd();

  const sourceRoomodes = path.join(templateRoot, ".roomodes");
  const sourceRoo = path.join(templateRoot, ".roo");

  if (!pathExists(sourceRoomodes) || !pathExists(sourceRoo)) {
    exitWithError("Bundled template is missing templates/full/.roomodes or templates/full/.roo/");
  }

  const targetRoomodes = path.join(projectRoot, ".roomodes");
  const targetRoo = path.join(projectRoot, ".roo");
  const hasExistingConfig = pathExists(targetRoomodes) || pathExists(targetRoo);

  if (hasExistingConfig && !force) {
    console.log(`
Zoo Flow found existing config in this project.

Existing:
${pathExists(targetRoomodes) ? "  - .roomodes\n" : ""}${pathExists(targetRoo) ? "  - .roo/\n" : ""}
Run again with --force to back up and overwrite:

  npx @fernado03/zoo-flow@latest init --force
`);
    process.exit(0);
  }

  const backupDir = path.join(projectRoot, ".zoo-flow-backup", makeTimestamp());
  let didBackup = false;

  if (hasExistingConfig) {
    fs.mkdirSync(backupDir, { recursive: true });
    didBackup = backupIfExists(projectRoot, backupDir, ".roomodes") || didBackup;
    didBackup = backupIfExists(projectRoot, backupDir, ".roo") || didBackup;

    removeRecursive(targetRoomodes);
    removeRecursive(targetRoo);
  }

  copyRecursive(sourceRoomodes, targetRoomodes);
  copyRecursive(sourceRoo, targetRoo);

  console.log(`
Zoo Flow installed.

Copied:
  - .roomodes
  - .roo/

${didBackup ? `Backup:\n  ${backupDir}\n` : ""}Next:
  1. Reload VS Code
  2. Open Zoo Code
  3. Switch to custom-orchestrator
  4. Try a small request, e.g.:
       change a harmless comment in README

When workflow choices appear, type the number manually, e.g. 1.
`);
}

function doctor() {
  const args = new Set(process.argv.slice(3));
  const rootToCheck = args.has("--template-only") ? templateRoot : process.cwd();
  const failures = validateTemplate(rootToCheck);

  if (failures.length > 0) {
    console.error("\nZoo Flow doctor found problems:\n");
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    console.error("");
    process.exit(1);
  }

  console.log(`Zoo Flow doctor passed: ${rootToCheck}`);
}

function update() {
  const args = new Set(process.argv.slice(3));
  const dryRun = args.has("--dry-run");
  const projectRoot = process.cwd();

  const sourceRoomodes = path.join(templateRoot, ".roomodes");
  const sourceRoo = path.join(templateRoot, ".roo");

  if (!pathExists(sourceRoomodes) || !pathExists(sourceRoo)) {
    exitWithError("Bundled template is missing templates/full/.roomodes or templates/full/.roo/");
  }

  const targetRoomodes = path.join(projectRoot, ".roomodes");
  const targetRoo = path.join(projectRoot, ".roo");
  const hasRoomodes = pathExists(targetRoomodes);
  const hasRoo = pathExists(targetRoo);

  if (!hasRoomodes && !hasRoo) {
    console.log(`
Zoo Flow is not installed in this project yet.

Run:
  npx @fernado03/zoo-flow@latest init
`);
    process.exit(0);
  }

  if (dryRun) {
    console.log(`
Zoo Flow update dry run.

Would back up:
${hasRoomodes ? "  - .roomodes\n" : ""}${hasRoo ? "  - .roo/\n" : ""}
Would replace with latest template:
  - .roomodes
  - .roo/

Run this to update:
  npx @fernado03/zoo-flow@latest update
`);
    process.exit(0);
  }

  const backupDir = path.join(projectRoot, ".zoo-flow-backup", makeTimestamp());
  fs.mkdirSync(backupDir, { recursive: true });

  let didBackup = false;
  didBackup = backupIfExists(projectRoot, backupDir, ".roomodes") || didBackup;
  didBackup = backupIfExists(projectRoot, backupDir, ".roo") || didBackup;

  removeRecursive(targetRoomodes);
  removeRecursive(targetRoo);

  copyRecursive(sourceRoomodes, targetRoomodes);
  copyRecursive(sourceRoo, targetRoo);

  console.log(`
Zoo Flow updated.

Replaced:
  - .roomodes
  - .roo/

${didBackup ? `Backup:\n  ${backupDir}\n\nTo restore the previous config:\n  rm -rf .roomodes .roo\n  cp -R ${backupDir}/. .\n` : ""}
Next:
  1. Reload VS Code
  2. Open Zoo Code
  3. Confirm the three custom modes still appear
`);
}

if (!command || command === "--help" || command === "-h") {
  console.log(HELP);
  process.exit(0);
}

if (command === "init") {
  install();
} else if (command === "update") {
  update();
} else if (command === "doctor") {
  doctor();
} else {
  console.log(HELP);
  process.exit(1);
}
