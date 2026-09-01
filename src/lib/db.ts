import { Pool, type QueryResultRow } from 'pg';

const connectionString = process.env.DATABASE_URL;

export type ProjectRow = {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  category: string;
  size: string;
  created_at: string;
  updated_at: string;
};

if (!connectionString) {
  console.warn('DATABASE_URL is not set. Neon PostgreSQL connection will be unavailable.');
}

export const pool = connectionString
  ? new Pool({
      connectionString,
      ssl: {
        rejectUnauthorized: false,
      },
    })
  : null;

export async function query<T extends QueryResultRow = QueryResultRow>(text: string, params: any[] = []) {
  if (!pool) {
    throw new Error('DATABASE_URL is not defined. Add your Neon connection string in .env.local');
  }

  return pool.query<T>(text, params);
}

export async function ensureProjectTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS projects (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      image TEXT,
      link TEXT,
      category VARCHAR(100) NOT NULL DEFAULT 'General',
      size VARCHAR(20) NOT NULL DEFAULT 'medium',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `);
}

