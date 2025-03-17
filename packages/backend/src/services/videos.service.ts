import { Video } from '../types';

export function filterVideosByEndDate(videos: Video[], endDate: Date) {
  return videos.filter(video => new Date(video.created_at) <= endDate);
}

export function filterTitleBySearchString(
  videos: Video[],
  title: string,
): Video[] {
  return videos.filter(video => video.title.toLowerCase().includes(title));
}

export function filterVideosByStartDate(videos: Video[], startDate: Date) {
  return videos.filter(video => new Date(video.created_at) >= startDate);
}

export function filterVideosByTags(videos: Video[], tags: string[]) {
  return videos.filter(video =>
    tags.every(tag =>
      video.tags.some(videoTag => videoTag.toLowerCase() === tag),
    ),
  );
}

const sortMap: Record<string, (a: Video, b: Video) => number> = {
  newest: (a, b) =>
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  oldest: (a, b) =>
    new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  alphabetical: (a, b) => a.title.localeCompare(b.title),
};

export function sortVideos(videos: Video[], sortBy: string) {
  const sorter = sortMap[sortBy];

  return sorter ? [...videos].sort(sorter) : videos;
}
