import type { Video } from '@/api/video';
import { VideoCard } from './video-card';

export function VideoList({ videos }: { videos: Video[] }) {
    return (
        <div>
            {videos.map((video) => (
                <VideoCard {...video} />
            ))}
        </div>
    );
}
