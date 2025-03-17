import videoJSON from '../data/videos.json';
import type { Video } from '../types/index.ts';

const createVideoData = () => {
  let cachedVideos: Video[] = videoJSON.videos;

  return {
    getVideos: () => cachedVideos,
    getVideoById: (id: string) =>
      cachedVideos.find((video: Video) => video.id === id) || null,
  };
};

export default createVideoData();
