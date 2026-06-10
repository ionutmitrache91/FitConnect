import bcrypt from 'bcrypt';
import { createUser, findUserByEmail } from '../models/userModel.js';
import { signToken } from '../services/tokenService.js';
import { httpError } from '../utils/httpError.js';
import { normalizeEmail, validateLogin, validateRegistration } from '../utils/validation.js';

function authResponse(user) {
  const safeUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at
  };

  return {
    user: safeUser,
    token: signToken(safeUser)
  };
}

export async function register(req, res) {
  const validationError = validateRegistration(req.body);

  if (validationError) {
    throw httpError(400, validationError);
  }

  const name = req.body.name.trim();
  const email = normalizeEmail(req.body.email);
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw httpError(409, 'An account with this email already exists.');
  }

  const passwordHash = await bcrypt.hash(req.body.password, 10);
  const user = await createUser({ name, email, passwordHash });

  res.status(201).json(authResponse(user));
}

export async function login(req, res) {
  const validationError = validateLogin(req.body);

  if (validationError) {
    throw httpError(400, validationError);
  }

  const email = normalizeEmail(req.body.email);
  const user = await findUserByEmail(email);

  if (!user) {
    throw httpError(401, 'Invalid email or password.');
  }

  const passwordMatches = await bcrypt.compare(req.body.password, user.password_hash);

  if (!passwordMatches) {
    throw httpError(401, 'Invalid email or password.');
  }

  res.json(authResponse(user));
}

