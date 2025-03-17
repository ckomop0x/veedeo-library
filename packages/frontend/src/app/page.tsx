import VideosSearch from '@/components/VideosSearch/VideosSearch';
import VideosSection from '@/components/sections/VideosSection';

export default function Home() {
  return (
    <>
      <h1 className="p-4">Video Gallery</h1>
      <VideosSearch />
      <VideosSection />
    </>
  );
}
