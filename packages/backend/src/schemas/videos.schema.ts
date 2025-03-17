import { z } from 'zod';

export const videosQuerySchema = z.object({
  search: z.string().optional(),
  tags: z.union([z.string(), z.array(z.string())]).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  sortBy: z.enum(['newest', 'oldest', 'alphabetical']).optional(),
  page: z.coerce.number().default(1),
  pageSize: z.coerce.number().default(10),
});

export type VideosQuery = z.infer<typeof videosQuerySchema>;
