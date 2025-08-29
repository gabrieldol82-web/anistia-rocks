import { sql } from "./db.js";

async function createTable() {
    await sql`
        CREATE TABLE IF NOT EXISTS members (
            id UUID PRIMARY KEY,
            name TEXT NOT NULL,
            role TEXT NOT NULL,
            image TEXT,
            bio TEXT,
            albums TEXT[],
            artists TEXT[],
            favorite_to_play TEXT
        )
    `

    console.log("Tabela criada com sucesso")
}

createTable();