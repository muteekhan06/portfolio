/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADMIN_PASSWORD_HASH: string;
  readonly VITE_ADMIN_TOTP_SECRET: string;
  readonly VITE_JWT_SECRET: string;
  readonly VITE_GITHUB_PAT?: string;
  readonly VITE_GITHUB_REPO: string;
  readonly VITE_GITHUB_BRANCH: string;
  // EmailJS removed from project - env vars intentionally omitted
  readonly VITE_PLAUSIBLE_DOMAIN?: string;
  readonly VITE_PLAUSIBLE_API_HOST?: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
  readonly MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
