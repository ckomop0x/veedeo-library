'use client';

import useVideos from '@/hooks/useVideos';
import VideosList from '@/components/VideosList/VideosList';
import Pagination from '@/components/Pagination/Pagination';

export default function VideosSection() {
  const { total } = useVideos();

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-row items-center justify-between w-full p-4">
          Total videos: {total}
        </div>
      </div>
      <VideosList />
      {total > 1 && (
        <div className="flex justify-center my-8">
          <Pagination />
        </div>
      )}
    </>
  );
}
