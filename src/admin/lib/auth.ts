import bcrypt from 'bcryptjs';
import speakeasy from 'speakeasy';

// Admin credentials from environment
const ADMIN_PASSWORD_HASH = import.meta.env.VITE_ADMIN_PASSWORD_HASH;
const ADMIN_TOTP_SECRET = import.meta.env.VITE_ADMIN_TOTP_SECRET;
const JWT_SECRET = import.meta.env.VITE_JWT_SECRET || 'fallback-secret-change-in-production';

// Brute force protection (in-memory, resets on page reload)
const loginAttempts = new Map<string, { count: number; lockUntil: number }>();
const MAX_ATTEMPTS = 5;
const LOCK_DURATION = 10 * 60 * 1000; // 10 minutes

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  expiresAt: number | null;
}

/**
 * Verify password using bcrypt
 */
export async function verifyPassword(password: string): Promise<boolean> {
  try {
    return await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
  } catch (error) {
    console.error('Password verification failed:', error);
    return false;
  }
}

/**
 * Verify TOTP code
 */
export function verifyTOTP(token: string): boolean {
  try {
    return speakeasy.totp.verify({
      secret: ADMIN_TOTP_SECRET,
      encoding: 'base32',
      token,
      window: 2 // Allow 2 time-steps before/after for clock drift
    });
  } catch (error) {
    console.error('TOTP verification failed:', error);
    return false;
  }
}

/**
 * Generate TOTP QR code data for initial setup
 */
export function generateTOTPSetup(accountName = 'Admin') {
  return speakeasy.generateSecret({
    name: `Portfolio Admin (${accountName})`,
    issuer: 'Mutee Portfolio'
  });
}

/**
 * Check if IP is locked due to brute force attempts
 */
export function isLocked(ip: string): boolean {
  const attempt = loginAttempts.get(ip);
  if (!attempt) return false;
  
  if (Date.now() < attempt.lockUntil) {
    return true;
  }
  
  // Lock expired, reset
  loginAttempts.delete(ip);
  return false;
}

/**
 * Record failed login attempt
 */
export function recordFailedAttempt(ip: string): number {
  const attempt = loginAttempts.get(ip) || { count: 0, lockUntil: 0 };
  attempt.count += 1;
  
  if (attempt.count >= MAX_ATTEMPTS) {
    attempt.lockUntil = Date.now() + LOCK_DURATION;
  }
  
  loginAttempts.set(ip, attempt);
  return MAX_ATTEMPTS - attempt.count;
}

/**
 * Clear login attempts on successful login
 */
export function clearAttempts(ip: string): void {
  loginAttempts.delete(ip);
}

/**
 * Generate simple JWT (client-side only, for session management)
 */
export function generateToken(payload: any, expiresIn = 15 * 60 * 1000): string {
  const header = { alg: 'HS256', typ: 'JWT' };
  const exp = Date.now() + expiresIn;
  const fullPayload = { ...payload, exp };
  
  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(fullPayload));
  
  const signature = btoa(
    encodedHeader + '.' + encodedPayload + '.' + JWT_SECRET
  );
  
  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

/**
 * Verify JWT token
 */
export function verifyToken(token: string): any | null {
  try {
    const [header, payload, signature] = token.split('.');
    
    // Verify signature
    const expectedSignature = btoa(
      header + '.' + payload + '.' + JWT_SECRET
    );
    
    if (signature !== expectedSignature) {
      return null;
    }
    
    const decoded = JSON.parse(atob(payload));
    
    // Check expiration
    if (decoded.exp && decoded.exp < Date.now()) {
      return null;
    }
    
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

/**
 * Get client IP (best effort in browser)
 */
export function getClientIP(): string {
  // In production, this would come from server
  // For client-side, use a fingerprint
  return 'client-browser';
}

/**
 * Login with password and TOTP
 */
export async function login(password: string, totpCode: string): Promise<{ success: boolean; token?: string; error?: string; remainingAttempts?: number }> {
  const ip = getClientIP();
  
  // Check brute force lock
  if (isLocked(ip)) {
    return {
      success: false,
      error: 'Too many failed attempts. Please try again in 10 minutes.'
    };
  }
  
  // Verify password
  const passwordValid = await verifyPassword(password);
  if (!passwordValid) {
    const remaining = recordFailedAttempt(ip);
    return {
      success: false,
      error: 'Invalid credentials',
      remainingAttempts: remaining > 0 ? remaining : undefined
    };
  }
  
  // Verify TOTP
  const totpValid = verifyTOTP(totpCode);
  if (!totpValid) {
    const remaining = recordFailedAttempt(ip);
    return {
      success: false,
      error: 'Invalid 2FA code',
      remainingAttempts: remaining > 0 ? remaining : undefined
    };
  }
  
  // Success - clear attempts and generate token
  clearAttempts(ip);
  const token = generateToken({ role: 'admin' }, 15 * 60 * 1000); // 15 min
  
  return {
    success: true,
    token
  };
}

/**
 * Logout (client-side)
 */
export function logout(): void {
  // Clear any stored tokens
  localStorage.removeItem('admin_token');
  sessionStorage.removeItem('admin_token');
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  const token = localStorage.getItem('admin_token') || sessionStorage.getItem('admin_token');
  if (!token) return false;
  
  const payload = verifyToken(token);
  return payload !== null;
}

/**
 * Get current session
 */
export function getSession(): AuthState {
  const token = localStorage.getItem('admin_token') || sessionStorage.getItem('admin_token');
  
  if (!token) {
    return {
      isAuthenticated: false,
      token: null,
      expiresAt: null
    };
  }
  
  const payload = verifyToken(token);
  
  if (!payload) {
    // Token invalid, clear it
    logout();
    return {
      isAuthenticated: false,
      token: null,
      expiresAt: null
    };
  }
  
  return {
    isAuthenticated: true,
    token,
    expiresAt: payload.exp
  };
}

/**
 * Save session
 */
export function saveSession(token: string, remember = false): void {
  if (remember) {
    localStorage.setItem('admin_token', token);
  } else {
    sessionStorage.setItem('admin_token', token);
  }
}
