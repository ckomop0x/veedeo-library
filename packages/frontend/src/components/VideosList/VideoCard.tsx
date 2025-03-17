import Tags from '@/components/Tags/Tags';
import VideoViews from './VideoViews';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

interface VideoCardProps {
  video: {
    id: string;
    title: string;
    thumbnail_url: string;
    created_at: string;
    tags: string[];
    views: number;
  };
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <article
      key={video.id}
      className="relative border border-indigo-200 rounded-lg overflow-hidden shadow-lg
                 transition-transform hover:scale-[1.02] hover:shadow-xxl duration-300 flex flex-col
                 group"
    >
      <div className="absolute right-2 top-2 bg-background/80 px-2 py-1 rounded-lg">
        <VideoViews views={video.views} />
      </div>
      <Image
        width={300}
        height={200}
        src={video.thumbnail_url}
        alt={video.title}
        priority
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h4 className="font-semibold text-lg flex-grow">{video.title}</h4>
        <p className="text-xs text-muted">
          Uploaded on: {new Date(video.created_at).toLocaleDateString('en-NL')}
        </p>
        <div className="my-2 flex flex-wrap gap-1">
          <Tags tags={video.tags} />
        </div>
        <div className="mt-4 xl:mt-auto ">
          <Button className="w-full sm:w-auto ml-auto" asChild>
            <Link href={`/videos/${video.id}`}>Watch Now</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
