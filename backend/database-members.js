import { randomUUID } from "node:crypto";
import { sql } from "./db.js";

export class DatabaseMembers {
    async list() {
        return await sql`SELECT * FROM members`;
    }

    async get(id) {
        const [member] = await sql`SELECT * FROM members WHERE id = ${id}`;
        return member;
    }

    async create(member){
        const memberId = randomUUID();
        const {
            name,
            role,
            image,
            bio,
            albums,
            artists,
            favorite_to_play
        } = member;

        await sql`
            INSERT INTO members (id, name, role, image, bio, albums, artists, favorite_to_play)
            VALUES (${memberId}, ${member.name}, ${member.role}, ${member.image}, ${member.bio}, ${member.albums}, ${member.artists}, ${member.favorite_to_play})
        `
    }

    async update(id, member) {
        const {
            name,
            role,
            image,
            bio,
            albums,
            artists,
            favorite_to_play
        } = member;

        await sql`
            UPDATE members
            SET name = ${member.name}, role = ${member.role}, image = ${member.image}, bio = ${member.bio}, albums = ${member.albums}, artists = ${member.artists}, favorite_to_play = ${member.favorite_to_play}
            WHERE id = ${id}
        `
    }

    async delete(id) {
        await sql`
            DELETE FROM members WHERE id = ${id}
        `
    }
    
}