import { sql } from "./db.js";

sql`
    CREATE TABLE shows (
        id TEXT PRIMARY KEY,
        title TEXT,
        location TEXT,
        description TEXT,
        show_date TIMESTAMP
    )
`.then(() => {
    console.log('criou a tabela shows')
})