import * as api from '@/api';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useSearchParams } from 'react-router';
import { VideoCard } from '@/components/video-card';

export function HomePage() {
    const [searchParams, _] = useSearchParams();
    const query = searchParams.get('query');

    const {
        data: videos,
        error,
        isPending,
    } = useQuery({
        queryKey: ['videos'],
        queryFn: () => api.video.queryAll(query),
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
        <div className="mx-auto p-7 px-20">
            {videos.map((video) => (
                <VideoCard className='w-md' {...video} />
            ))}
        </div>
    );
}
