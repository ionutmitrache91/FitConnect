import dotenv from 'dotenv';
import app from './src/app.js';
import { initializeDatabase } from './src/database/connection.js';

dotenv.config();

const port = process.env.PORT || 5000;

await initializeDatabase();

app.listen(port, () => {
  console.log(`FitConnect API running on http://localhost:${port}`);
});

