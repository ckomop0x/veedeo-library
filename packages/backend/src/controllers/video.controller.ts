import videoData from '../data/videoData';

export async function getVideoById(id: string) {
  return videoData.getVideoById(id);
}
