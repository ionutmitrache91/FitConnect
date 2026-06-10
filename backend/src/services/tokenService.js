import jwt from 'jsonwebtoken';

export function getJwtSecret() {
  return process.env.JWT_SECRET || 'fitconnect-development-secret-change-me';
}

export function signToken(user) {
  return jwt.sign(
    {
      name: user.name,
      email: user.email
    },
    getJwtSecret(),
    {
      subject: String(user.id),
      expiresIn: '7d'
    }
  );
}

