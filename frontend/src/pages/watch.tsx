// @ts-nocheck

import { Button } from '@/components/ui/button';
import { MinimalVideoCard, type VideoCardProps } from '@/components/video-card';
import { formatDate, formatNumber } from '@/lib/utils';
import { ThumbsUp, ThumbsDown, Share, Eye, ChevronDown } from 'lucide-react';
import { Link, useParams } from 'react-router';

const videoData = {
    '1': {
        title: 'Prime Reacts - Why I Stopped Using AI Code Editors',
        videoUrl:
            'https://www.youtube.com/watch?v=y3_TY4K8hVE&pp=ygUIcHJpbWFnZW4%3D',
        uploader: 'ThePrimeTime',
        view: 125847,
        createdAt: new Date(Date.now()),
        like: 10000,
        dislike: 100,
        description:
            "In this comprehensive tutorial, we'll build a modern web application using Next.js 15. We'll cover the latest features including Server Components, App Router, and more. Perfect for developers looking to level up their React skills.\n\nTimestamps:\n0:00 Introduction\n2:30 Setting up Next.js\n8:15 Creating components\n15:20 Routing and navigation\n22:45 Deployment",
        avatar: '/placeholder.svg?height=40&width=40',
    },
};

const suggestedVideos: VideoCardProps[] = [
    {
        animationDelay: 400,
        thumbnail: '/placeholder.svg',
        title: 'Building a Modern Web App with Next.js',
        uploader: 'Tech Tutorials',
        duration: 600,
        viewCount: 100,
        createdAt: new Date(Date.now()),
    },
    {
        animationDelay: 400,
        thumbnail: '/placeholder.svg',
        title: 'Building a Modern Web App with Next.js',
        uploader: 'Tech Tutorials',
        duration: 600,
        viewCount: 100,
        createdAt: new Date(Date.now()),
    },
    {
        animationDelay: 400,
        thumbnail: '/placeholder.svg',
        title: 'Building a Modern Web App with Next.js',
        uploader: 'Tech Tutorials',
        duration: 600,
        viewCount: 100,
        createdAt: new Date(Date.now()),
    },
    {
        animationDelay: 400,
        thumbnail: '/placeholder.svg',
        title: 'Building a Modern Web App with Next.js',
        uploader: 'Tech Tutorials',
        duration: 600,
        viewCount: 100,
        createdAt: new Date(Date.now()),
    },
    {
        animationDelay: 400,
        thumbnail: '/placeholder.svg',
        title: 'Building a Modern Web App with Next.js',
        uploader: 'Tech Tutorials',
        duration: 600,
        viewCount: 100,
        createdAt: new Date(Date.now()),
    },
    {
        animationDelay: 400,
        thumbnail: '/placeholder.svg',
        title: 'Building a Modern Web App with Next.js',
        uploader: 'Tech Tutorials',
        duration: 600,
        viewCount: 100,
        createdAt: new Date(Date.now()),
    },
];

export default function Watch() {
    const { id } = useParams();

    const video = videoData[id];

    return (
        <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 mb-6 animate-fade-in hover:border-neutral-700 transition-colors duration-300">
                        <div className="aspect-video bg-black">
                            <video
                                className="w-full h-full"
                                controls
                                preload="metadata"
                                poster={video.videoUrl}
                            >
                                <source src={video.videoUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>

                    <div className="space-y-6 animate-fade-in-delay">
                        <div className="animate-slide-up">
                            <h1 className="text-xl font-semibold text-white mb-3 leading-tight">
                                {video.title}
                            </h1>
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div className="flex items-center space-x-3 animate-slide-right">
                                    <div className="w-10 h-10 bg-neutral-700 rounded-full flex items-center justify-center text-white font-medium hover:bg-neutral-600 transition-colors duration-300">
                                        {video.uploader[0]}
                                    </div>
                                    <div>
                                        <p className="font-medium text-white">
                                            {video.uploader}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2 animate-slide-left">
                                    <div className="flex items-center bg-neutral-800 rounded-full border border-neutral-700 hover:border-neutral-600 transition-colors duration-300">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="rounded-l-full text-white hover:bg-neutral-700 px-4 hover:scale-105 transition-all duration-300"
                                        >
                                            <ThumbsUp className="w-4 h-4 mr-2" />
                                            {formatNumber(video.like)}
                                        </Button>
                                        <div className="w-px h-6 bg-neutral-700" />
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="rounded-r-full text-white hover:bg-neutral-700 px-3 hover:scale-105 transition-all duration-300"
                                        >
                                            <ThumbsDown className="w-4 h-4" />
                                            {formatNumber(video.dislike)}
                                        </Button>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 px-4 hover:scale-105 transition-all duration-300"
                                    >
                                        <Share className="w-4 h-4 mr-2" />
                                        Share
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-neutral-400 animate-fade-in">
                            <span className="flex items-center space-x-1">
                                <Eye className="w-4 h-4" />
                                <span>{formatNumber(video.view)}</span>
                            </span>
                            <span>•</span>
                            <span>{formatDate(video.createdAt)}</span>
                        </div>

                        <div className="bg-neutral-900 rounded-xl p-4 border border-neutral-800 hover:border-neutral-700 transition-all duration-300 animate-fade-in-up">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-white">
                                        Description
                                    </span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-neutral-400 hover:text-white p-1 hover:scale-110 transition-all duration-300"
                                    >
                                        <ChevronDown className="w-4 h-4" />
                                    </Button>
                                </div>
                                <p className="text-neutral-300 text-sm leading-relaxed whitespace-pre-line">
                                    {video.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 animate-fade-in-delay">
                    <h3 className="font-semibold text-white">
                        Suggested Videos
                    </h3>
                    <div className="space-y-3">
                        {suggestedVideos.map((video, index) => (
                            <Link
                                key={index}
                                to={`/watch/${index}`}
                                className="group animate-fade-in-up mx-3"
                            >
                                <MinimalVideoCard {...video} />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
