import { Clock, Eye, Play } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { formatDate, formatDuration, formatNumber } from '@/lib/utils';

export interface VideoCardProps {
    animationDelay: number;
    thumbnail?: string;
    title: string;
    uploader: string;
    duration: number; // millisecond
    view: number;
    createdAt: Date;
}

export function VideoCard({
    animationDelay,
    thumbnail,
    title,
    uploader,
    duration,
    view,
    createdAt,
}: VideoCardProps) {
    return (
        <Card
            className="group p-0 bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 hover:border-neutral-700 transition-all duration-500 hover:shadow-2xl hover:shadow-black/20 hover:scale-105 hover:cursor-pointer animate-fade-in-up"
            style={{ animationDelay: `${animationDelay}ms` }}
        >
            <CardHeader className="relative aspect-video bg-neutral-800 overflow-hidden">
                <img
                    src={thumbnail}
                    alt={title}
                    className="absolute object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded font-medium flex items-center space-x-1 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                    <Clock className="w-3 h-3" />
                    <span>{formatDuration(duration)}</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-5 h-5 text-neutral-900 fill-neutral-900 ml-0.5" />
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-4 transition-colors duration-300">
                <h3 className="font-medium text-white line-clamp-2 mb-2 group-hover:text-neutral-200 transition-colors duration-300 leading-snug">
                    {title}
                </h3>
                <p className="text-neutral-400 text-sm mb-2 group-hover:text-neutral-300 transition-colors duration-300">
                    {uploader}
                </p>
                <div className="flex items-center text-xs text-neutral-500 space-x-2 group-hover:text-neutral-400 transition-colors duration-300">
                    <span className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{formatNumber(view)}</span>
                    </span>
                    <span>•</span>
                    <span>{formatDate(createdAt)}</span>
                </div>
            </CardContent>
        </Card>
    );
}

export function MinimalVideoCard({
    animationDelay,
    thumbnail,
    title,
    uploader,
    duration,
    view,
    createdAt,
}: VideoCardProps) {
    return (
        <article
            className="overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-black/20"
            style={{ animationDelay: `${animationDelay}ms` }}
        >
            <div className="flex space-x-3">
                <div className="relative w-32 aspect-video bg-neutral-800 rounded overflow-hidden flex-shrink-0">
                    <img
                        src={thumbnail || '/placeholder.svg'}
                        alt={title}
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded flex items-center space-x-1">
                        <Clock className="w-2 h-2" />
                        <span>{formatDuration(duration)}</span>
                    </div>
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-white line-clamp-2 text-sm mb-1 group-hover:text-neutral-200 transition-colors duration-300 leading-snug">
                        {title}
                    </h4>
                    <p className="text-xs text-neutral-400 mb-1 group-hover:text-neutral-300 transition-colors duration-300">
                        {uploader}
                    </p>
                    <div className="flex items-center text-xs text-neutral-500 space-x-1 group-hover:text-neutral-400 transition-colors duration-300">
                        <span className="flex items-center space-x-1">
                            <Eye className="w-2 h-2" />
                            <span>{formatNumber(view)}</span>
                        </span>
                        <span>•</span>
                        <span>{formatDate(createdAt)}</span>
                    </div>
                </div>
            </div>
        </article>
    );
}
