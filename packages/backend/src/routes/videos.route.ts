import * as fastify from 'fastify';
import { videosQuerySchema } from '../schemas/videos.schema';
import { getVideos } from '../controllers/videos.controller';

export default async function videosRoutes(
  fastifyInstance: fastify.FastifyInstance,
) {
  fastifyInstance.get('/videos', async request => {
    const query = videosQuerySchema.parse(request.query);

    if (typeof query.tags === 'string') {
      query.tags = [query.tags];
    }

    return getVideos(query);
  });
}
