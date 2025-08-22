import { sql } from "./db.js";

sql`
    ALTER TABLE shows 
    ADD COLUMN is_completed BOOLEAN
`.then(() => {
    console.log('Coluna is_completed adicionada à tabela shows');
});