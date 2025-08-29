import { fastify } from 'fastify';
import cors from '@fastify/cors';
import {DatabasePostgres} from './database-postgres.js';
import { DatabaseMembers } from './database-members.js';

const server = fastify();

await server.register(cors, {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
})

// Tudo de shows
const database = new DatabasePostgres();

server.post('/shows', async (request, response) => {

    const { title, location, description, show_date, is_completed } = request.body;

    await database.create({
        title,
        location,
        description,
        show_date,
        is_completed: 0
    })

    return response.status(201).send()
})

server.get('/shows', async (request, response) => {
    const shows = await database.list();

    shows.sort((a, b) => {
        if (a.is_completed === b.is_completed) {
            return new Date(b.show_date) - new Date(a.show_date);
        }
        return a.is_completed ? 1 : -1;
    });
    shows.sort((a, b) => new Date(b.show_date) - new Date(a.show_date));

    return shows;
})

server.put('/shows/:id', async (request, response) => {

    const showId = request.params.id;

    const { title, location, description, show_date, is_completed } = request.body;

    await database.update(showId, {
        title,
        location,
        description,
        show_date,
        is_completed
    });


    return response.status(204).send();
})

server.delete('/shows/:id', async(request, response) => {
    const showId = request.params.id;

    await database.delete(showId);

    return response.status(204).send();
})

// Membros
const membersDatabase = new DatabaseMembers();

server.get("/members", async () => {
    return await membersDatabase.list();
})

server.get("/members/:id", async (request, reply) => {
    const memberId = request.params.id;
    const member = await membersDatabase.get(memberId);
    if (!member) {
        return reply.status(404).send();
    }
    return member;
})

server.post("/members", async (request, reply) => {
    const { name, role, image, bio, albums, artists, favorite_to_play } = request.body;

    await membersDatabase.create({
        name,
        role,
        image,
        bio,
        albums,
        artists,
        favorite_to_play
    });

    return reply.status(201).send();
})

server.put("/members/:id", async (request, reply) => {
    const memberId = request.params.id;
    const { name, role, image, bio, albums, artists, favorite_to_play } = request.body;

    await membersDatabase.update(memberId, {
        name,
        role,
        image,
        bio,
        albums,
        artists,
        favorite_to_play
    });

    return reply.status(204).send();
})

server.delete("/members/:id", async (request, reply) => {
    const memberId = request.params.id;

    await membersDatabase.delete(memberId);

    return reply.status(204).send();
})

server.listen({
    port: 3333
})
