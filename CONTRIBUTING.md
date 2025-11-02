# Contributing to MEGA GODED ULTRA™ Portfolio

Thank you for your interest in contributing! This project is built with 100% free tools and we want to keep it that way.

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported
2. Create a detailed issue with:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots (if applicable)
   - Environment details

### Suggesting Features

1. Search for existing feature requests
2. Create an issue with:
   - Clear description
   - Use case
   - Benefits
   - **Must be implementable with FREE tools**

### Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly
5. Commit with clear messages: `git commit -m 'feat: Add amazing feature'`
6. Push to your fork: `git push origin feature/amazing-feature`
7. Open a Pull Request

## Development Setup

```powershell
# Clone your fork
git clone https://github.com/YOUR_USERNAME/portfolio.git
cd portfolio

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev
```

## Code Standards

### TypeScript

- Use TypeScript for all new code
- Add proper types, no `any`
- Follow existing patterns

### React

- Functional components with hooks
- Keep components small and focused
- Use proper prop types

### Styling

- Use Tailwind CSS classes
- Follow existing design system
- Ensure mobile responsiveness

### Testing

- Write tests for new features
- Ensure all tests pass: `npm test`
- Maintain >80% coverage

## Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Testing
- `chore`: Maintenance

Example:

```
feat(admin): Add image compression

- Add client-side image compression
- Reduce upload sizes by 70%
- Maintains 100% free stack

Closes #123
```

## Testing Checklist

Before submitting PR:

- [ ] Code builds: `npm run build`
- [ ] Linting passes: `npm run lint`
- [ ] Types check: `npm run type-check`
- [ ] Tests pass: `npm test`
- [ ] Manual testing completed
- [ ] Mobile responsive
- [ ] Works in Chrome, Firefox, Safari
- [ ] No console errors

## FREE Tools Requirement

**CRITICAL**: All contributions must maintain the 100% free stack:

✅ Allowed:

- React, Vite, TypeScript
- Tailwind CSS
- Vercel (Free Hobby)
- GitHub Actions (Free tier)
- Contact queue / third-party email providers (optional)
- Open-source libraries

❌ Not Allowed:

- Paid APIs or services
- Premium features requiring payment
- Tools with limited trials
- Services requiring credit cards

## Questions?

- Open an issue
- Check existing discussions
- Email: mutee@example.com

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for helping make this portfolio even more MEGA GODED ULTRA™!** 🚀
