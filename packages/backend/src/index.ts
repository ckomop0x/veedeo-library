import Fastify from 'fastify';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
import videosRoutes from './routes/videos.route';
import videoRoutes from './routes/video.route';

dotenv.config();

const fastify = Fastify({ logger: true });

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;

const start = async () => {
  try {
    await fastify.register(cors, { origin: process.env.CORS_ORIGIN || '*' });
    await fastify.register(videosRoutes);
    await fastify.register(videoRoutes);
    await fastify.listen({ port: PORT, host: '0.0.0.0' });
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

void start();
