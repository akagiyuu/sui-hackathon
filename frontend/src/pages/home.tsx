import { VideoCard, type VideoCardProps } from '@/components/video-card';

const videos: VideoCardProps[] = [
    {
        animationDelay: 100,
        thumbnail: '/placeholder.svg',
        title: 'Building a Modern Web App with Next.js',
        uploader: 'Tech Tutorials',
        duration: 600,
        view: 100,
        createAt: new Date(Date.now()),
    },
    {
        animationDelay: 200,
        thumbnail: '/placeholder.svg',
        title: 'Building a Modern Web App with Next.js',
        uploader: 'Tech Tutorials',
        duration: 600,
        view: 100,
        createAt: new Date(Date.now()),
    },
    {
        animationDelay: 300,
        thumbnail: '/placeholder.svg',
        title: 'Building a Modern Web App with Next.js',
        uploader: 'Tech Tutorials',
        duration: 600,
        view: 100,
        createAt: new Date(Date.now()),
    },
    {
        animationDelay: 400,
        thumbnail: '/placeholder.svg',
        title: 'Building a Modern Web App with Next.js',
        uploader: 'Tech Tutorials',
        duration: 600,
        view: 100,
        createAt: new Date(Date.now()),
    },
];

export function Home() {
    return (
        <div className="mx-auto p-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video) => (
                <VideoCard {...video} />
            ))}
        </div>
    );
}
