import Ajv, { JSONSchemaType } from 'ajv';
import DOMPurify from 'dompurify';

const ajv = new Ajv();

// Validation schemas for data files

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  avatar: string;
  location: string;
  email: string;
  phone: string;
  bio: string;
  availability: string;
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    portfolio?: string;
  };
  resume: string;
  lastUpdated: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  featured: boolean;
  status: string;
  links: {
    live?: string;
    github?: string;
    demo?: string;
  };
  metrics?: {
    lighthouse?: number;
    deployTime?: string;
    cost?: string;
  };
  startDate: string;
  endDate?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
}

const profileSchema: JSONSchemaType<Profile> = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    title: { type: 'string', minLength: 1 },
    tagline: { type: 'string', minLength: 1 },
    avatar: { type: 'string', minLength: 1 },
    location: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    phone: { type: 'string' },
    bio: { type: 'string', minLength: 1 },
    availability: { type: 'string' },
    socials: {
      type: 'object',
      properties: {
        github: { type: 'string', nullable: true },
        linkedin: { type: 'string', nullable: true },
        twitter: { type: 'string', nullable: true },
        portfolio: { type: 'string', nullable: true }
      },
      required: []
    },
    resume: { type: 'string' },
    lastUpdated: { type: 'string' }
  },
  required: ['name', 'title', 'tagline', 'avatar', 'location', 'email', 'phone', 'bio', 'availability', 'socials', 'resume', 'lastUpdated']
};

const projectSchema: JSONSchemaType<Project> = {
  type: 'object',
  properties: {
    id: { type: 'string', minLength: 1 },
    title: { type: 'string', minLength: 1 },
    description: { type: 'string', minLength: 1 },
    image: { type: 'string' },
    tags: { type: 'array', items: { type: 'string' } },
    category: { type: 'string' },
    featured: { type: 'boolean' },
    status: { type: 'string' },
    links: {
      type: 'object',
      properties: {
        live: { type: 'string', nullable: true },
        github: { type: 'string', nullable: true },
        demo: { type: 'string', nullable: true }
      },
      required: []
    },
    metrics: {
      type: 'object',
      properties: {
        lighthouse: { type: 'number', nullable: true },
        deployTime: { type: 'string', nullable: true },
        cost: { type: 'string', nullable: true }
      },
      required: [],
      nullable: true
    },
    startDate: { type: 'string' },
    endDate: { type: 'string', nullable: true }
  },
  required: ['id', 'title', 'description', 'image', 'tags', 'category', 'featured', 'status', 'links', 'startDate']
};

// Compile validators
const validateProfile = ajv.compile(profileSchema);
const validateProject = ajv.compile(projectSchema);

/**
 * Sanitize HTML content to prevent XSS
 */
export function sanitizeHTML(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: ['href', 'target', 'rel']
  });
}

/**
 * Sanitize object recursively
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const sanitized = {} as T;
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key as keyof T] = sanitizeHTML(value) as T[keyof T];
    } else if (Array.isArray(value)) {
      sanitized[key as keyof T] = value.map(item =>
        typeof item === 'string' ? sanitizeHTML(item) : 
        typeof item === 'object' ? sanitizeObject(item) : 
        item
      ) as T[keyof T];
    } else if (value && typeof value === 'object') {
      sanitized[key as keyof T] = sanitizeObject(value) as T[keyof T];
    } else {
      sanitized[key as keyof T] = value;
    }
  }
  
  return sanitized;
}

/**
 * Validate and sanitize profile data
 */
export function validateProfileData(data: any): { valid: boolean; data?: Profile; errors?: string[] } {
  const sanitized = sanitizeObject(data);
  const valid = validateProfile(sanitized);
  
  if (!valid) {
    return {
      valid: false,
      errors: validateProfile.errors?.map(e => `${e.instancePath} ${e.message}`) || ['Unknown validation error']
    };
  }
  
  return {
    valid: true,
    data: sanitized
  };
}

/**
 * Validate and sanitize project data
 */
export function validateProjectData(data: any): { valid: boolean; data?: Project; errors?: string[] } {
  const sanitized = sanitizeObject(data);
  const valid = validateProject(sanitized);
  
  if (!valid) {
    return {
      valid: false,
      errors: validateProject.errors?.map(e => `${e.instancePath} ${e.message}`) || ['Unknown validation error']
    };
  }
  
  return {
    valid: true,
    data: sanitized
  };
}

/**
 * Validate JSON structure
 */
export function validateJSON(jsonString: string): { valid: boolean; data?: any; error?: string } {
  try {
    const data = JSON.parse(jsonString);
    return { valid: true, data };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : 'Invalid JSON'
    };
  }
}

/**
 * Rate limiter (in-memory)
 */
const rateLimits = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(
  key: string,
  maxRequests: number = 10,
  windowMs: number = 60000
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const limit = rateLimits.get(key);
  
  if (!limit || now > limit.resetAt) {
    // New window
    const resetAt = now + windowMs;
    rateLimits.set(key, { count: 1, resetAt });
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetAt
    };
  }
  
  if (limit.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: limit.resetAt
    };
  }
  
  limit.count += 1;
  return {
    allowed: true,
    remaining: maxRequests - limit.count,
    resetAt: limit.resetAt
  };
}
