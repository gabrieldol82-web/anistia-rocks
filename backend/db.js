// backend/db.js
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { neon } from '@neondatabase/serverless';

// Necessário para montar o caminho absoluto até a raiz
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const sql = neon(process.env.DATABASE_URL);
