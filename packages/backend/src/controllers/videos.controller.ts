import type { VideosQuery } from '../schemas/videos.schema.ts';
import type { Video } from '../types/index';
import videoData from '../data/videoData';
import { parseTags } from '../utils/parseTags';
import {
  filterTitleBySearchString,
  filterVideosByEndDate,
  filterVideosByStartDate,
  filterVideosByTags,
  sortVideos,
} from '../services/videos.service';

export const getVideos = async (query: VideosQuery) => {
  const allVideos: Video[] = videoData.getVideos();

  const normalizedQuery = {
    search: query.search?.toLowerCase().trim(),
    tags: parseTags(query.tags),
    startDate: query.startDate ? new Date(query.startDate) : undefined,
    endDate: query.endDate ? new Date(query.endDate) : undefined,
    sortBy: query.sortBy,
    page: query.page || 1,
    pageSize: query.pageSize || 10,
  };

  let filteredVideos = allVideos;

  if (normalizedQuery.search) {
    filteredVideos = filterTitleBySearchString(
      filteredVideos,
      normalizedQuery.search,
    );
  }

  if (normalizedQuery.tags.length > 0) {
    filteredVideos = filterVideosByTags(filteredVideos, normalizedQuery.tags);
  }

  if (normalizedQuery.startDate) {
    filteredVideos = filterVideosByStartDate(
      filteredVideos,
      normalizedQuery.startDate,
    );
  }

  if (normalizedQuery.endDate) {
    filteredVideos = filterVideosByEndDate(
      filteredVideos,
      normalizedQuery.endDate,
    );
  }

  if (normalizedQuery.sortBy) {
    filteredVideos = sortVideos(filteredVideos, normalizedQuery.sortBy);
  }

  const total = filteredVideos.length;
  const paginatedVideos = filteredVideos.slice(
    (normalizedQuery.page - 1) * normalizedQuery.pageSize,
    normalizedQuery.page * normalizedQuery.pageSize,
  );

  return { videos: paginatedVideos, total };
};
