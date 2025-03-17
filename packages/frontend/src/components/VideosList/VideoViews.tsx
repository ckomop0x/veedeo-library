import { Eye } from 'lucide-react';

interface VideoViewsProps {
  views: number;
}

export default function VideoViews({ views }: VideoViewsProps) {
  return (
    <div
      className="flex items-center gap-1 text-muted-foreground text-sm transition-opacity duration-300"
      title={`Views: ${views.toLocaleString()}`}
    >
      <Eye className="h-4 w-4" role="img" aria-hidden="true" />
      {views.toLocaleString()}
    </div>
  );
}
