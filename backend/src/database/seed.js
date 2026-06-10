import { DEFAULT_EVENT_IMAGE } from '../utils/eventImages.js';

const dayMs = 24 * 60 * 60 * 1000;

function futureDate(daysFromNow) {
  return new Date(Date.now() + daysFromNow * dayMs).toISOString().slice(0, 10);
}

// European sample users
const sampleUsers = [
  {
    name: 'Anna Schmidt',
    email: 'anna.schmidt@example.de',
    city: 'Berlin',
    country: 'Germany'
  },
  {
    name: 'Luc Dupont',
    email: 'luc.dupont@example.fr',
    city: 'Paris',
    country: 'France'
  },
  {
    name: 'Marco Rossi',
    email: 'marco.rossi@example.it',
    city: 'Milan',
    country: 'Italy'
  },
  {
    name: 'Elena García',
    email: 'elena.garcia@example.es',
    city: 'Barcelona',
    country: 'Spain'
  },
  {
    name: 'Sofia Müller',
    email: 'sofia.muller@example.ch',
    city: 'Zurich',
    country: 'Switzerland'
  },
  {
    name: 'Oliver Jensen',
    email: 'oliver.jensen@example.dk',
    city: 'Copenhagen',
    country: 'Denmark'
  }
];

// European fitness events with European cities and venues
const sampleEvents = [
  {
    title: 'Morgenjogging im Tiergarten',
    description: 'Ein lockeres Lauftempo durch Berlins grüne Lunge mit Aufwärm- und Dehnübungen. Perfekt für Anfänger und Fortgeschrittene.',
    dateOffset: 4,
    time: '07:00',
    location: 'Tiergarten, Berlin, Germany',
    category: 'Running',
    creatorEmail: 'anna.schmidt@example.de',
    image_url: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Yoga au Parc du Luxembourg',
    description: 'Une séance de yoga revigorant au cœur de Paris, axée sur la mobilité et l\'équilibre pour tous les niveaux.',
    dateOffset: 5,
    time: '09:30',
    location: 'Parc du Luxembourg, Paris, France',
    category: 'Yoga',
    creatorEmail: 'luc.dupont@example.fr',
    image_url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Escursionismo Alpi - Gruppo principianti',
    description: 'Una mezza giornata di trekking guidato con punti panoramici, soste di idratazione e ritmo adatto ai principianti attivi.',
    dateOffset: 8,
    time: '08:15',
    location: 'Rifugio Auronzo, Dolomiti, Italy',
    category: 'Hiking',
    creatorEmail: 'marco.rossi@example.it',
    image_url: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Paseo en Bici por Barcelona',
    description: 'Una ruta social por la ciudad utilizando carriles protegidos, terminando en un smoothie bar local.',
    dateOffset: 10,
    time: '10:00',
    location: 'Plaza Reial, Barcelona, Spain',
    category: 'Cycling',
    creatorEmail: 'elena.garcia@example.es',
    image_url: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'CrossFit Anfänger-Session',
    description: 'Eine von Trainern geleitete Einführungsveranstaltung mit sicheren Bewegungen, skalierbaren Übungen und unterstützender Atmosphäre.',
    dateOffset: 12,
    time: '17:30',
    location: 'Iron Yard Studio, Zurich, Switzerland',
    category: 'Bootcamp',
    creatorEmail: 'sofia.muller@example.ch',
    image_url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Løbegruppe ved Tåsinge Strand',
    description: 'En afslappet løbetur langs stranden med solnedgangsudsigthed, afslutning med stræk og valgfrit tempo.',
    dateOffset: 14,
    time: '18:45',
    location: 'Tåsinge Strand, Copenhagen, Denmark',
    category: 'Running',
    creatorEmail: 'oliver.jensen@example.dk',
    image_url: 'https://images.unsplash.com/photo-1502904550040-7534597429ae?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Meditation und Wellness München',
    description: 'Ein achtsamer Abend mit geführter Meditation, Tagebuchschreiben und Gesprächen über gesunde Gewohnheiten.',
    dateOffset: 16,
    time: '19:00',
    location: 'Yoga & Meditation Zentrum, Munich, Germany',
    category: 'Wellness',
    creatorEmail: 'anna.schmidt@example.de',
    image_url: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Bootcamp à Strasbourg',
    description: 'Une séance circuit haute-énergie combinant force, cardio et travail d\'équipe dans un format extensible en plein air.',
    dateOffset: 18,
    time: '06:30',
    location: 'Parc de l\'Orangerie, Strasbourg, France',
    category: 'Bootcamp',
    creatorEmail: 'luc.dupont@example.fr',
    image_url: DEFAULT_EVENT_IMAGE
  },
  {
    title: 'Trail Running Toscana',
    description: 'Una corsa su sentieri affascinanti attraverso le colline toscane con pause rinfrescanti e viste mozzafiato.',
    dateOffset: 20,
    time: '07:30',
    location: 'Val d\'Orcia, Tuscany, Italy',
    category: 'Running',
    creatorEmail: 'marco.rossi@example.it',
    image_url: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Pilates al Parque Güell',
    description: 'Clases de pilates al aire libre con vistas a la ciudad, enfoque en el núcleo y la flexibilidad.',
    dateOffset: 22,
    time: '10:00',
    location: 'Parque Güell, Barcelona, Spain',
    category: 'Wellness',
    creatorEmail: 'elena.garcia@example.es',
    image_url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Windsurfing Gruppe Genfer See',
    description: 'Windsurfing-Training mit Instruktoren für Anfänger und Fortgeschrittene, Sicherheitsausrüstung inbegriffen.',
    dateOffset: 25,
    time: '09:00',
    location: 'Lac Léman, Geneva, Switzerland',
    category: 'Water Sports',
    creatorEmail: 'sofia.muller@example.ch',
    image_url: 'https://images.unsplash.com/photo-1518525677915-4b400ca199e7?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Cykeltur gennem København',
    description: 'En socialt cykeltur gennem Københavns varme veje med stop ved lokale kaffe barer.',
    dateOffset: 27,
    time: '14:00',
    location: 'City Hall Square, Copenhagen, Denmark',
    category: 'Cycling',
    creatorEmail: 'oliver.jensen@example.dk',
    image_url: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1200&q=80'
  }
];

export async function seedEvents(db) {
  const existing = await db.get('SELECT COUNT(*) AS count FROM events');

  if (existing.count > 0) {
    return;
  }

  // Create demo users
  const userIds = {};
  const passwordHash = '$2b$10$uR9LEnH8N9CUXFc14i/ZrOlbWDDvPN03p/4r2SOo3XLefoQR/YTQq'; // demo password

  for (const user of sampleUsers) {
    const existing = await db.get('SELECT id FROM users WHERE email = ?', user.email);
    
    if (existing) {
      userIds[user.email] = existing.id;
    } else {
      const result = await db.run(
        `INSERT INTO users (name, email, password_hash)
         VALUES (?, ?, ?)`,
        user.name,
        user.email,
        passwordHash
      );
      userIds[user.email] = result.lastID;
    }
  }

  // Insert events
  for (const event of sampleEvents) {
    const creatorId = userIds[event.creatorEmail];
    
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

