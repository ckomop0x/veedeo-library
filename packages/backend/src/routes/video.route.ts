import * as fastify from 'fastify';
import { getVideoById } from '../controllers/video.controller';

export default async function videoRoutes(
  fastifyInstance: fastify.FastifyInstance,
) {
  fastifyInstance.get('/videos/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const video = await getVideoById(id);

    if (!video) {
      return reply.status(404).send({ message: 'Video not found' });
    }

    return video;
  });
}
