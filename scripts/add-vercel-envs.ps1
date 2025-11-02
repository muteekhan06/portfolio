# PowerShell wrapper to run the Node script that adds Vercel env vars from .env
# Usage: Open PowerShell, cd to project root and run:
#   .\scripts\add-vercel-envs.ps1

$node = Get-Command node -ErrorAction SilentlyContinue
if (-not $node) {
  Write-Error "Node.js not found in PATH. Install Node.js (https://nodejs.org) and try again."
  exit 1
}

$vercel = Get-Command vercel -ErrorAction SilentlyContinue
if (-not $vercel) {
  Write-Warning "Vercel CLI not found. Install it with: npm i -g vercel and login with: vercel login"
}

Write-Output "Running Node script to add Vercel environment variables (reads .env)..."
node .\scripts\add-vercel-envs.js
if ($LASTEXITCODE -ne 0) {
  Write-Error "Script exited with code $LASTEXITCODE. Check output above for details."
  exit $LASTEXITCODE
}

Write-Output "Finished. Review output above to confirm which variables were added."
