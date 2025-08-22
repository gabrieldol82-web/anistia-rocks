import { fastify } from 'fastify';
import cors from '@fastify/cors';
import {DatabasePostgres} from './database-postgres.js';

const server = fastify();

await server.register(cors, {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
})

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


server.listen({
    port: 3333
})
