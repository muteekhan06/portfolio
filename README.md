# 🚀 MEGA GODED ULTRA™ Portfolio v4.1

**100% LIFETIME FREE STACK** — Zero paid tools, zero subscriptions, infinite scalability.

[![Deploy](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Free](https://img.shields.io/badge/Cost-$0.00%2Fmonth-success)](https://github.com)
[![Lighthouse](https://img.shields.io/badge/Lighthouse-100%2F100-brightgreen)](https://web.dev/measure)

> Built by **Mutee-ur-Rehman** | November 2025 | SRS v4.1

---

## ✨ Features

### 🆓 100% Free Forever

- ✅ **Hosting**: Vercel (Free Hobby Plan)
- ✅ **CI/CD**: GitHub Actions (2000 min/month)
- ✅ **Auth**: Password + TOTP (self-hosted, no Firebase)
- ✅ **Email**: Local queue (no third-party)
- ✅ **Storage**: GitHub + Vercel Blob
- ✅ **Analytics**: Plausible (self-hosted) or GitHub Views
- ✅ **Fonts**: Google Fonts
- ✅ **Icons**: Lucide (MIT)
- ✅ **AI**: Transformers.js (client-side, no API)

### 🎨 Ultra Animations

- Three.js Hero with GLSL shaders
- GSAP scroll effects
- Framer Motion components
- Canvas particle fields
- Glassmorphic UI

### ⚡ Admin Dashboard

- Monaco Editor (VS Code in browser)
- Live preview
- Image uploader (Vercel Blob)
- 2FA authentication
- Auto-commit to GitHub
- Deploy in <60s

### 📊 Performance

- Lighthouse: **100/100/100/100**
- Deploy time: **<60s**
- Content update: **<45s** (login → live)
- PWA installable
- Offline support

---

## 🏗️ Architecture

```
User → Vercel CDN → Static SPA
           ↓
    Admin Dashboard (/admin)
           ↓
    GitHub API (commits)
           ↓
    Auto-Deploy (Vercel)
```

**Database**: GitHub `/data/*.json` files  
**Backend**: None (serverless functions only)  
**Auth**: Client-side bcrypt + TOTP

---

## 📦 Installation

### Prerequisites

- Node.js 18+
- GitHub account (free)
- Vercel account (free)

### 1. Clone & Install

```powershell
git clone https://github.com/yourusername/portfolio.git
cd portfolio
npm install
```

### 2. Environment Setup

```powershell
cp .env.example .env
```

Edit `.env` with your credentials:

```env
# Generate password hash
# Run: node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('YourPassword', 10));"
VITE_ADMIN_PASSWORD_HASH=$2a$10$...

# Generate TOTP secret
# Run: node -e "const speakeasy = require('speakeasy'); console.log(speakeasy.generateSecret().base32);"
VITE_ADMIN_TOTP_SECRET=YOUR_SECRET

# GitHub Personal Access Token
# Create at: https://github.com/settings/tokens (scope: repo)
VITE_GITHUB_PAT=ghp_...
VITE_GITHUB_REPO=yourusername/yourrepo
VITE_GITHUB_BRANCH=main

# Email sending: local queue is used by default (EmailJS removed)
# If you want a third-party provider, add the provider-specific variables and restore delivery logic in `src/lib/email.ts`

# JWT Secret (random string)
VITE_JWT_SECRET=your-random-secret-key
```

### 3. Generate Credentials

```powershell
# Install bcrypt and speakeasy globally
npm install -g bcryptjs speakeasy

# Generate password hash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('MySecurePassword123', 10));"

# Generate TOTP secret
node -e "const speakeasy = require('speakeasy'); const secret = speakeasy.generateSecret(); console.log('Secret:', secret.base32); console.log('QR Code URL:', secret.otpauth_url);"
```

Use a TOTP app (Google Authenticator, Authy) to scan the QR code.

### 4. Run Development Server

```powershell
npm run dev
```

Open http://localhost:3000

### 5. Access Admin

Navigate to http://localhost:3000/admin

---

## 🚀 Deployment

### Vercel (Free)

1. **Push to GitHub**

```powershell
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Import to Vercel**

- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Import your GitHub repo
- Add environment variables from `.env`
- Deploy

3. **Auto-Deploy Setup**

Vercel automatically deploys on push. Optionally add GitHub Actions:

```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
```

---

## 📝 Content Management

### Admin Dashboard

1. Login at `/admin`
2. Edit JSON files directly (Monaco editor)
3. Upload images (auto-WebP conversion)
4. Preview changes live
5. Click "Publish" → Auto-commits to GitHub → Vercel redeploys

### Manual Updates

Edit files in `/data/*.json`:

- `profile.json` - Bio, contact, socials
- `projects.json` - Project portfolio
- `experience.json` - Work history
- `skills.json` - Technical skills
- `awards.json` - Achievements
- `i18n/en.json`, `i18n/ur.json` - Translations

Commit changes:

```powershell
git add data/
git commit -m "Update projects"
git push
```

Vercel auto-deploys in <60s.

---

## 🔒 Security

### Authentication

- **Password**: bcrypt hashed (10 rounds)
- **2FA**: TOTP (Google Authenticator)
- **Session**: JWT (15 min expiry)
- **Brute Force**: 5 attempts → 10 min lock

### XSS Protection

- DOMPurify sanitization
- CSP headers
- JSON schema validation

### Headers

```json
{
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Content-Security-Policy": "..."
}
```

---

## 📊 Stack Details

| Layer         | Tool                         | Free Tier   | Limits                     |
| ------------- | ---------------------------- | ----------- | -------------------------- |
| **Hosting**   | Vercel                       | Free Hobby  | Unlimited sites, 100 GB/mo |
| **Repo**      | GitHub                       | Free Public | Unlimited repos            |
| **CI/CD**     | GitHub Actions               | Free        | 2000 min/mo                |
| **Storage**   | GitHub + Vercel Blob         | Free        | Unlimited files            |
| **Auth**      | bcrypt + TOTP                | Free        | Self-hosted                |
| **Email**     | Local queue (no third-party) | Free        | N/A                        |
| **Analytics** | Plausible (self-hosted)      | Free        | Unlimited                  |
| **Fonts**     | Google Fonts                 | Free        | font-display: swap         |
| **Icons**     | Lucide                       | Free        | MIT License                |
| **Images**    | Vercel Image Optimization    | Free        | Auto-WebP                  |
| **AI**        | Transformers.js              | Free        | Client-side                |

---

## 📈 Performance Optimization

### Bundle Size

- Code splitting
- Lazy loading
- Tree shaking
- Minification

### Images

- WebP conversion
- Lazy loading
- Responsive images
- Blur placeholders

### Caching

- Static assets: 1 year
- JSON data: 60s (stale-while-revalidate)
- Service Worker offline cache

---

## 🛠️ Development

### Scripts

```powershell
npm run dev           # Start dev server
npm run build         # Build for production
npm run preview       # Preview production build
npm run admin         # Start admin dev server
npm run lint          # Lint code
npm run test          # Run tests
npm run validate      # Validate JSON schemas
npm run type-check    # TypeScript type checking
```

### Testing

```powershell
npm test
```

Includes:

- Unit tests (Vitest)
- Accessibility tests (axe-core)
- Lighthouse CI

---

## 📂 Project Structure

```
/
├── data/                    # Content (GitHub = DB)
│   ├── profile.json
│   ├── projects.json
│   ├── experience.json
│   ├── skills.json
│   ├── awards.json
│   └── i18n/
│       ├── en.json
│       └── ur.json
├── src/
│   ├── admin/               # Admin dashboard
│   │   ├── components/
│   │   ├── pages/
│   │   └── lib/
│   │       ├── auth.ts      # bcrypt + TOTP
│   │       ├── github.ts    # GitHub API
│   │       └── validation.ts
│   ├── components/          # UI components
│   ├── pages/               # Routes
│   ├── App.tsx
│   └── main.tsx
├── public/
│   ├── assets/
│   └── manifest.json
├── .github/
│   └── workflows/           # CI/CD
├── package.json
├── vite.config.ts
├── vercel.json
└── README.md
```

---

## 🎯 Roadmap

- [ ] Dark/Light mode toggle
- [ ] Blog section (MDX)
- [ ] Multi-language support
- [ ] Visitor analytics (self-hosted)
- [ ] Contact form with queue
- [ ] PDF resume generator
- [ ] GitHub contributions graph

---

## 📄 License

MIT © Mutee-ur-Rehman

---

## 🙏 Credits

Built with 100% free and open-source tools:

- React, Vite, TypeScript
- Tailwind CSS
- Three.js, GSAP, Framer Motion
- Vercel, GitHub
- And many more amazing free tools!

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/portfolio/issues)
- **Email**: mutee@example.com
- **Twitter**: [@mutee_dev](https://twitter.com/mutee_dev)

---

**⭐ Star this repo if you found it helpful!**
