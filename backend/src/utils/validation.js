const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

export function validateRegistration(body) {
  if (!body?.name || body.name.trim().length < 2) {
    return 'Name must be at least 2 characters.';
  }

  if (!emailPattern.test(normalizeEmail(body.email))) {
    return 'A valid email address is required.';
  }

  if (!body?.password || body.password.length < 8) {
    return 'Password must be at least 8 characters.';
  }

  return null;
}

export function validateLogin(body) {
  if (!emailPattern.test(normalizeEmail(body?.email))) {
    return 'A valid email address is required.';
  }

  if (!body?.password) {
    return 'Password is required.';
  }

  return null;
}

