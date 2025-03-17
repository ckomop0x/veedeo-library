import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import supertest from 'supertest';
import videosRoutes from '../src/routes/videos.route';
import { Video } from '../src/types';

const setupTestServer = async () => {
  const fastify = Fastify();
  await fastify.register(cors, { origin: '*' });
  await fastify.register(videosRoutes);
  await fastify.ready();
  return fastify;
};

describe('GET /videos API', () => {
  let fastify: ReturnType<typeof Fastify>;

  beforeAll(async () => {
    fastify = await setupTestServer();
  });

  afterAll(async () => {
    await fastify.close();
  });

  it('should return paginated videos', async () => {
    const response = await supertest(fastify.server).get('/videos').expect(200);

    expect(response.body).toHaveProperty('videos');
    expect(response.body).toHaveProperty('total');
    expect(Array.isArray(response.body.videos)).toBeTruthy();
    expect(response.body.videos.length).toBeLessThanOrEqual(10);
  });

  it('should search videos by title', async () => {
    const response = await supertest(fastify.server)
      .get('/videos')
      .query({ search: 'Advanced' })
      .expect(200);

    expect(response.body.videos.length).toBeGreaterThan(0);
    response.body.videos.forEach((video: any) => {
      expect(video.title.toLowerCase()).toContain('advanced');
    });
  });

  it('should filter videos by tags', async () => {
    const response = await supertest(fastify.server)
      .get('/videos')
      .query({ tags: 'marketing' })
      .expect(200);

    expect(response.body.videos.length).toBeGreaterThan(0);
    response.body.videos.forEach((video: any) => {
      expect(video.tags).toContain('marketing');
    });
  });

  it('should filter videos by date range', async () => {
    const response = await supertest(fastify.server)
      .get('/videos')
      .query({ startDate: '2025-01-01', endDate: '2025-01-31' })
      .expect(200);

    expect(response.body.videos.length).toBeGreaterThan(0);
    response.body.videos.forEach((video: Video) => {
      const videoTimestamp = new Date(video.created_at).getTime();
      const startDateTimestamp = new Date('2025-01-01').getTime();
      const endDateTimestamp = new Date('2025-01-31').getTime();

      expect(videoTimestamp).toBeGreaterThanOrEqual(startDateTimestamp);
      expect(videoTimestamp).toBeLessThanOrEqual(endDateTimestamp);
    });
  });

  it('should sort videos by newest first', async () => {
    const response = await supertest(fastify.server)
      .get('/videos')
      .query({ sortBy: 'newest' })
      .expect(200);

    const dates = response.body.videos.map((v: any) =>
      new Date(v.created_at).getTime(),
    );
    expect(dates).toEqual([...dates].sort((a, b) => b - a));
  });

  it('should sort videos by oldest first', async () => {
    const response = await supertest(fastify.server)
      .get('/videos')
      .query({ sortBy: 'oldest' })
      .expect(200);

    const dates = response.body.videos.map((v: any) =>
      new Date(v.created_at).getTime(),
    );
    expect(dates).toEqual([...dates].sort((a, b) => a - b));
  });

  it('should sort videos alphabetically', async () => {
    const response = await supertest(fastify.server)
      .get('/videos')
      .query({ sortBy: 'alphabetical' })
      .expect(200);

    const titles = response.body.videos.map((v: any) => v.title);
    const sortedTitles = [...titles].sort();
    expect(titles).toEqual(sortedTitles);
  });

  it('should paginate videos correctly', async () => {
    const response = await supertest(fastify.server)
      .get('/videos')
      .query({ page: 2, pageSize: 5 })
      .expect(200);

    expect(response.body.videos.length).toBeLessThanOrEqual(5);
  });
});
