#!/usr/bin/env node
/*
  scripts/add-vercel-envs.js
  Reads .env in project root and attempts to add those variables to Vercel using the `vercel` CLI.
  This script runs `vercel env add <NAME> production` and supplies the value via stdin.
  Requirements: vercel CLI installed and authenticated (vercel login).

  Usage: node scripts/add-vercel-envs.js
*/

const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const ENV_FILE = path.resolve(__dirname, "..", ".env");

function parseDotEnv(content) {
  const lines = content.split(/\r?\n/);
  const out = {};
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    let value = trimmed.slice(idx + 1).trim();
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }
    out[key] = value;
  }
  return out;
}

function runVercelEnvAdd(name, value, target = "production") {
  console.log(`Adding Vercel env: ${name} (${target})`);

  // Spawn vercel env add <name> <target>
  const args = ["env", "add", name, target];
  const res = spawnSync("vercel", args, {
    input: value + "\n",
    stdio: ["pipe", "inherit", "inherit"],
  });

  if (res.error) {
    console.error(`Failed to run vercel: ${res.error.message}`);
    return false;
  }
  if (res.status !== 0) {
    console.warn(
      `vercel exited with code ${res.status} for ${name} (${target}).`
    );
    return false;
  }
  return true;
}

function main() {
  if (!fs.existsSync(ENV_FILE)) {
    console.error(
      ".env file not found at project root. Create .env with the required variables and re-run this script."
    );
    process.exit(1);
  }

  const env = parseDotEnv(fs.readFileSync(ENV_FILE, "utf8"));

  const vars = [
    "VITE_ADMIN_PASSWORD_HASH",
    "VITE_ADMIN_TOTP_SECRET",
    "VITE_JWT_SECRET",
    "VITE_GITHUB_PAT",
    "VITE_GITHUB_REPO",
    "VITE_GITHUB_BRANCH",
    "VITE_PLAUSIBLE_DOMAIN",
  ];

  let any = false;
  for (const name of vars) {
    const val = env[name];
    if (!val) {
      console.log(`Skipping ${name}: not found in .env`);
      continue;
    }
    any = true;

    // Try production first
    const ok = runVercelEnvAdd(name, val, "production");
    if (!ok) {
      console.warn(
        `Could not add ${name} to Vercel (production). Please ensure vercel CLI is installed and you are logged in (vercel login).`
      );
    } else {
      console.log(`Added ${name} to production`);
    }

    // Also add to preview (optional)
    const ok2 = runVercelEnvAdd(name, val, "preview");
    if (ok2) console.log(`Added ${name} to preview`);
  }

  if (!any) {
    console.error("No matching variables found in .env. Nothing to add.");
    process.exit(1);
  }

  console.log(
    "Done. If any variables failed to add, run this script again after fixing the CLI or run the printed vercel commands manually."
  );
}

main();
