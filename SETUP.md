# 🚀 Quick Start Guide - MEGA GODED ULTRA™ Portfolio

## Prerequisites Installation

### 1. Install Node.js

Download and install Node.js 18+ from [nodejs.org](https://nodejs.org/)

Verify installation:

```powershell
node --version
npm --version
```

### 2. Install Git

Download from [git-scm.com](https://git-scm.com/) if not already installed.

### 3. Install Dependencies

```powershell
cd "c:\My Portfolio"
npm install
```

This will install all free dependencies:

- React, TypeScript, Vite
- Tailwind CSS, PostCSS
- Framer Motion, GSAP, Three.js
- Monaco Editor
- bcryptjs, speakeasy (auth)
- And more...

## Environment Setup

### 1. Create `.env` file

```powershell
cp .env.example .env
```

### 2. Generate Admin Password Hash

```powershell
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('MySecurePassword123', 10));"
```

Copy the output and paste into `.env` as `VITE_ADMIN_PASSWORD_HASH`

### 3. Generate TOTP Secret

```powershell
node -e "const speakeasy = require('speakeasy'); const secret = speakeasy.generateSecret({ name: 'Portfolio Admin' }); console.log('Secret:', secret.base32); console.log('QR URL:', secret.otpauth_url);"
```

Copy the `base32` secret into `.env` as `VITE_ADMIN_TOTP_SECRET`

### 4. GitHub Setup

1. Create a Personal Access Token at https://github.com/settings/tokens
2. Grant `repo` scope (full control)
3. Copy token into `.env` as `VITE_GITHUB_PAT`
4. Set your repo name: `VITE_GITHUB_REPO=yourusername/yourrepo`

### 5. Email provider (optional)

The project uses a local queue for contact messages by default. If you prefer to use a third-party provider (like EmailJS or another transactional email service), sign up with your provider, create a service/template as required and add the provider credentials to your environment variables. Then update `src/lib/email.ts` to enable delivery via your provider.

## Running the Project

### Development Server

```powershell
npm run dev
```

Visit: http://localhost:3000

### Admin Dashboard

```powershell
npm run admin
```

Visit: http://localhost:3001/admin

Or navigate to http://localhost:3000/admin

### Build for Production

```powershell
npm run build
```

Output in `dist/` folder

### Preview Production Build

```powershell
npm run preview
```

## Deploy to Vercel (FREE)

### 1. Push to GitHub

```powershell
git init
git add .
git commit -m "Initial commit - MEGA GODED ULTRA Portfolio"
git branch -M main
git remote add origin https://github.com/yourusername/yourrepo.git
git push -u origin main
```

### 2. Connect to Vercel

1. Go to https://vercel.com
2. Sign up with GitHub (FREE)
3. Click "New Project"
4. Import your GitHub repository
5. Configure:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Add environment variables from your `.env` file
7. Deploy!

### 3. Custom Domain (Optional)

Add your custom domain in Vercel settings (DNS configuration required)

## Admin Access

1. Navigate to `/admin`
2. Enter password (from `.env`)
3. Enter 2FA code from authenticator app
4. Start editing your portfolio!

## 2FA Setup

Use any TOTP app:

- Google Authenticator (iOS/Android)
- Authy (Desktop/Mobile)
- Microsoft Authenticator

Scan the QR code URL generated in step 3 of Environment Setup.

## Troubleshooting

### Dependencies not installing?

```powershell
rm -rf node_modules
rm package-lock.json
npm install
```

### TypeScript errors?

```powershell
npm run type-check
```

### Vercel deployment fails?

- Check build logs
- Ensure all env variables are set in Vercel dashboard
- Verify `vercel.json` configuration

### Admin login not working?

- Verify password hash in `.env`
- Check TOTP secret is correct
- Ensure 2FA code is current (30-second window)

## Next Steps

1. ✅ Install dependencies
2. ✅ Set up environment variables
3. ✅ Run development server
4. ✅ Edit content in `/data` folder
5. ✅ Push to GitHub
6. ✅ Deploy to Vercel
7. ✅ Configure custom domain
8. ✅ Set up admin 2FA
9. ✅ Start managing your portfolio!

## Support

- Documentation: See README.md
- Issues: https://github.com/yourusername/yourrepo/issues
- Email: mutee@example.com

---

**Cost to run: $0.00/month forever** 🎉
