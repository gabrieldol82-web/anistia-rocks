import { randomUUID } from "node:crypto";
import { sql } from "./db.js";

export class DatabasePostgres {

    async list() {
        const shows = await sql`SELECT * FROM shows`;

        return shows;
    }

    async create(show) {
        const showId = randomUUID();
        // To do:Adicionar validações de campos e retornar erros apropriados junto com server
        const {title, description, location, show_date} = show;

        await sql`INSERT INTO shows (id, title, location, description, show_date) VALUES (${showId}, ${title}, ${location}, ${description}, ${show_date})`;

    }

    async update(id, show) {
        const {title, description, location, show_date} = show;

        await sql`UPDATE shows SET title = ${title}, location = ${location}, description = ${description}, show_date = ${show_date} WHERE id = ${id}`;
    }

    async delete(id) {
        await sql`DELETE FROM shows WHERE id = ${id}`;
    }
}