import { fastify } from 'fastify';
import {DatabasePostgres} from './database-postgres.js';

const server = fastify();

const database = new DatabasePostgres();

server.post('/shows', async (request, response) => {

    const { title, location, description, show_date  } = request.body;

    await database.create({
        title,
        location,
        description,
        show_date 
    })

    return response.status(201).send()
})

server.get('/shows', async (request, response) => {
    const shows = await database.list();

    return shows;
})

server.put('/shows/:id', async (request, response) => {

    const showId = request.params.id;

    const { title, location, description, show_date  } = request.body;

    await database.update(showId, {
        title,
        location,
        description,
        show_date
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
