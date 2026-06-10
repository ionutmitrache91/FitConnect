import request from 'supertest';
import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import app from '../app.js';
import { closeDatabase, resetDatabaseForTests } from '../database/connection.js';
import { DEFAULT_EVENT_IMAGE } from '../utils/eventImages.js';

async function registerUser(overrides = {}) {
  const payload = {
    name: 'Test User',
    email: `test-${Date.now()}-${Math.random()}@example.com`,
    password: 'password123',
    ...overrides
  };

  const response = await request(app).post('/api/auth/register').send(payload);

  return {
    response,
    token: response.body.token,
    user: response.body.user,
    payload
  };
}

describe.sequential('FitConnect API', () => {
  beforeEach(async () => {
    await resetDatabaseForTests();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  it('registers users with validation and JWT authentication', async () => {
    const { response } = await registerUser({
      name: 'Avery Runner',
      email: 'avery@example.com'
    });

    expect(response.status).toBe(201);
    expect(response.body.token).toEqual(expect.any(String));
    expect(response.body.user).toMatchObject({
      name: 'Avery Runner',
      email: 'avery@example.com'
    });
    expect(response.body.user.password_hash).toBeUndefined();

    const duplicate = await request(app).post('/api/auth/register').send({
      name: 'Avery Runner',
      email: 'avery@example.com',
      password: 'password123'
    });

    expect(duplicate.status).toBe(409);
  });

  it('logs users in and protects authenticated profile routes', async () => {
    const { payload } = await registerUser({
      email: 'login@example.com',
      password: 'password123'
    });

    const login = await request(app).post('/api/auth/login').send({
      email: payload.email,
      password: payload.password
    });

    expect(login.status).toBe(200);
    expect(login.body.token).toEqual(expect.any(String));

    const profile = await request(app)
      .get('/api/users/me')
      .set('Authorization', `Bearer ${login.body.token}`);

    expect(profile.status).toBe(200);
    expect(profile.body.user.email).toBe(payload.email);

    const blocked = await request(app).get('/api/users/me');
    expect(blocked.status).toBe(401);
  });

  it('creates and edits events with image URL fallback support', async () => {
    const { token } = await registerUser({
      name: 'Coach Taylor',
      email: 'coach@example.com'
    });

    const created = await request(app)
      .post('/api/events')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Community Strength Night',
        description: 'A friendly strength workout focused on technique and scalable stations.',
        date: '2026-08-12',
        time: '18:30',
        location: 'Downtown Training Hall',
        category: 'Bootcamp',
        image_url: ''
      });

    expect(created.status).toBe(201);
    expect(created.body.event.image_url).toBe(DEFAULT_EVENT_IMAGE);

    const edited = await request(app)
      .put(`/api/events/${created.body.event.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Updated Strength Night',
        description: 'A refreshed strength workout with stations, coaching, and cooldowns.',
        date: '2026-08-13',
        time: '19:00',
        location: 'Downtown Training Hall',
        category: 'Bootcamp',
        image_url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80'
      });

    expect(edited.status).toBe(200);
    expect(edited.body.event.title).toBe('Updated Strength Night');
  });

  it('joins and cancels RSVPs while updating dashboard data', async () => {
    const { token } = await registerUser({
      name: 'Casey Cyclist',
      email: 'casey@example.com'
    });

    const events = await request(app).get('/api/events').set('Authorization', `Bearer ${token}`);
    const eventId = events.body.events[0].id;

    const joined = await request(app)
      .post('/api/rsvp/join')
      .set('Authorization', `Bearer ${token}`)
      .send({ eventId });

    expect(joined.status).toBe(200);
    expect(joined.body.event.joined_by_user).toBe(1);
    expect(joined.body.event.rsvp_count).toBe(1);

    const dashboard = await request(app).get('/api/dashboard').set('Authorization', `Bearer ${token}`);
    expect(dashboard.status).toBe(200);
    expect(dashboard.body.joinedEvents).toHaveLength(1);
    expect(dashboard.body.stats.joinedCount).toBe(1);

    const cancelled = await request(app)
      .post('/api/rsvp/cancel')
      .set('Authorization', `Bearer ${token}`)
      .send({ eventId });

    expect(cancelled.status).toBe(200);
    expect(cancelled.body.event.joined_by_user).toBe(0);
    expect(cancelled.body.event.rsvp_count).toBe(0);
  });

  it('creates RSVP notifications, event reminders, and marks them as read', async () => {
    const { token } = await registerUser({
      name: 'Morgan Mindful',
      email: 'morgan@example.com'
    });

    const events = await request(app).get('/api/events').set('Authorization', `Bearer ${token}`);
    const eventId = events.body.events[0].id;

    await request(app).post('/api/rsvp/join').set('Authorization', `Bearer ${token}`).send({ eventId });

    const notifications = await request(app).get('/api/notifications').set('Authorization', `Bearer ${token}`);
    expect(notifications.status).toBe(200);
    expect(notifications.body.notifications.length).toBeGreaterThanOrEqual(2);
    expect(notifications.body.unreadCount).toBeGreaterThanOrEqual(2);

    const read = await request(app).patch('/api/notifications/read-all').set('Authorization', `Bearer ${token}`);
    expect(read.status).toBe(200);
    expect(read.body.unreadCount).toBe(0);
    expect(read.body.notifications.every((notification) => notification.is_read === 1)).toBe(true);
  });
});

