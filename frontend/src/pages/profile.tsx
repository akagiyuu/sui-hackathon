import { VideoCard } from '@/components/video-card';
import * as api from '@/api';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VideoList } from '@/components/video-list';

function VideoTab() {
    const {
        data: videos,
        error,
        isPending,
    } = useQuery({
        queryKey: ['video', 'my'],
        queryFn: api.video.my,
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

    return <VideoList videos={videos} />;
}

export function Profile() {
    return (
        <div className="mx-auto p-7 px-20">
            <Tabs defaultValue="videos">
                <TabsList>
                    <TabsTrigger value="home">Home</TabsTrigger>
                    <TabsTrigger value="videos">Videos</TabsTrigger>
                </TabsList>
                <TabsContent value="home"></TabsContent>
                <TabsContent value="videos">
                    <VideoTab />
                </TabsContent>
            </Tabs>
        </div>
    );
}
