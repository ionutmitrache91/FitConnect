import { DEFAULT_EVENT_IMAGE } from '../utils/eventImages.js';

const dayMs = 24 * 60 * 60 * 1000;

function futureDate(daysFromNow) {
  return new Date(Date.now() + daysFromNow * dayMs).toISOString().slice(0, 10);
}

const sampleEvents = [
  {
    title: 'Morning Running Club',
    description: 'A steady-paced community run through the park with warmups, route options, and post-run coffee nearby.',
    dateOffset: 4,
    time: '07:00',
    location: 'Central Park, Main Gate',
    category: 'Running',
    image_url: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Weekend Yoga Session',
    description: 'An energizing outdoor yoga class focused on mobility, breathing, and balance for all experience levels.',
    dateOffset: 7,
    time: '09:30',
    location: 'Riverside Wellness Lawn',
    category: 'Yoga',
    image_url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Mountain Hiking Group',
    description: 'A guided half-day hike with scenic viewpoints, hydration stops, and a friendly pace for active beginners.',
    dateOffset: 11,
    time: '08:15',
    location: 'Blue Ridge Trailhead',
    category: 'Hiking',
    image_url: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Community Cycling Event',
    description: 'A social city ride using protected lanes and low-traffic roads, ending with a smoothie stop.',
    dateOffset: 13,
    time: '10:00',
    location: 'City Hall Plaza',
    category: 'Cycling',
    image_url: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Sunset Beach Run',
    description: 'A relaxed sand-and-boardwalk run with sunset views, cool-down stretches, and optional pace groups.',
    dateOffset: 15,
    time: '18:45',
    location: 'South Beach Pier',
    category: 'Running',
    image_url: 'https://images.unsplash.com/photo-1502904550040-7534597429ae?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'CrossFit Beginners Session',
    description: 'A coach-led intro workout covering safe movement, scaled exercises, and a supportive first-timer format.',
    dateOffset: 17,
    time: '17:30',
    location: 'Iron Yard Training Studio',
    category: 'Bootcamp',
    image_url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Meditation and Wellness Meetup',
    description: 'A mindful evening with guided meditation, journaling prompts, and conversation around healthy routines.',
    dateOffset: 19,
    time: '19:00',
    location: 'Lotus Community Center',
    category: 'Wellness',
    image_url: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Fitness Bootcamp',
    description: 'A high-energy circuit session combining strength, cardio, and teamwork in a scalable outdoor format.',
    dateOffset: 22,
    time: '06:30',
    location: 'Harbor Sports Field',
    category: 'Bootcamp',
    image_url: DEFAULT_EVENT_IMAGE
  }
];

export async function seedEvents(db) {
  const existing = await db.get('SELECT COUNT(*) AS count FROM events');

  if (existing.count > 0) {
    return;
  }

  const demoUser = await db.get('SELECT id FROM users WHERE email = ?', 'demo@fitconnect.local');
  let creatorId = demoUser?.id;

  if (!creatorId) {
    const created = await db.run(
      `INSERT INTO users (name, email, password_hash)
       VALUES (?, ?, ?)`,
      'FitConnect Demo Team',
      'demo@fitconnect.local',
      '$2b$10$uR9LEnH8N9CUXFc14i/ZrOlbWDDvPN03p/4r2SOo3XLefoQR/YTQq'
    );
    creatorId = created.lastID;
  }

  for (const event of sampleEvents) {
    await db.run(
      `INSERT INTO events (title, description, date, time, location, category, image_url, creator_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      event.title,
      event.description,
      futureDate(event.dateOffset),
      event.time,
      event.location,
      event.category,
      event.image_url,
      creatorId
    );
  }
}

