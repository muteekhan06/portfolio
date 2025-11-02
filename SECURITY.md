# Security Policy

## Supported Versions

Currently supported versions:

| Version | Supported          |
| ------- | ------------------ |
| 4.1.x   | :white_check_mark: |
| < 4.0   | :x:                |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to: **mutee@example.com**

Include:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

You should receive a response within 48 hours.

## Security Measures

This project implements several security measures:

### Authentication

- **Password**: bcrypt hashing (10 rounds)
- **2FA**: TOTP (speakeasy)
- **Sessions**: JWT with 15-minute expiry
- **Brute Force**: 5 attempts → 10-minute lock

### Data Protection

- **XSS**: DOMPurify sanitization
- **CSRF**: Same-origin policy
- **Injection**: JSON schema validation
- **Rate Limiting**: In-memory throttling

### Headers

```json
{
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Content-Security-Policy": "..."
}
```

### Environment Variables

- Never commit `.env` file
- Use Vercel environment variables
- Rotate credentials regularly
- Use strong passwords (min 12 characters)
- Store TOTP backup codes securely

### Dependencies

- Regular `npm audit` checks
- Automated Dependabot updates
- Only use trusted packages
- Minimal dependency footprint

## Best Practices

### For Users

1. Use strong, unique password
2. Enable 2FA
3. Don't share credentials
4. Log out after use
5. Keep backup codes safe
6. Monitor access logs

### For Developers

1. Never log sensitive data
2. Validate all inputs
3. Sanitize outputs
4. Use environment variables
5. Follow OWASP guidelines
6. Keep dependencies updated

## Known Limitations

- Client-side JWT (no httpOnly cookies in static sites)
- In-memory rate limiting (resets on deploy)
- No database audit logs
- Admin access is all-or-nothing

These are trade-offs for maintaining a 100% free, serverless architecture.

## Disclosure Policy

- Report received: 24 hours
- Initial response: 48 hours
- Fix developed: 7 days
- Patch released: 10 days
- Public disclosure: 30 days (after patch)

## Updates

Security updates are released as patch versions (e.g., 4.1.1) and noted in CHANGELOG.md.

Critical updates may be announced via:

- GitHub Security Advisories
- Email notifications
- README banner

## Contact

For security concerns: **mutee@example.com**

For general issues: [GitHub Issues](https://github.com/yourusername/portfolio/issues)

---

Last updated: November 2, 2025
