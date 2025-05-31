import { VideoCard } from '@/components/video-card';
import * as api from '@/api';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

export function Home() {
    const {
        data: videos,
        error,
        isPending,
    } = useQuery({
        queryKey: ['videos'],
        queryFn: () => api.video.getAll(),
    });

    if (isPending) {
        return <div></div>;
    }

    if (error) {
        toast.error(error.message);
        return <div></div>;
    }

    if (videos.length === 0) {
        return <p className="text-center text-2xl m-5">No video found</p>;
    }

    return (
        <div className="mx-auto p-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video) => (
                <VideoCard {...video} />
            ))}
        </div>
    );
}
