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

export function validateEventPayload(body) {
  const requiredFields = ['title', 'description', 'date', 'time', 'location', 'category'];

  for (const field of requiredFields) {
    if (!body?.[field] || String(body[field]).trim().length === 0) {
      return `${field.replace('_', ' ')} is required.`;
    }
  }

  if (String(body.title).trim().length < 4) {
    return 'Title must be at least 4 characters.';
  }

  if (String(body.description).trim().length < 12) {
    return 'Description must be at least 12 characters.';
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(body.date)) {
    return 'Date must use YYYY-MM-DD format.';
  }

  if (!/^\d{2}:\d{2}$/.test(body.time)) {
    return 'Time must use HH:MM format.';
  }

  if (body.image_url && !/^https?:\/\//i.test(String(body.image_url).trim())) {
    return 'Event image URL must start with http:// or https://.';
  }

  return null;
}
