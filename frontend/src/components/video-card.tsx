import { Clock, Play } from 'lucide-react';
import { formatDate, formatDuration, formatNumber } from '@/lib/utils';
import { useNavigate } from 'react-router';

export interface VideoCardProps {
    id: string;
    thumbnail: string;
    title: string;
    description: string;
    uploaderName: string;
    duration: number;
    viewCount: number;
    createdAt: Date;
}

export function VideoCard({
    id,
    thumbnail,
    title,
    description,
    uploaderName,
    duration,
    viewCount,
    createdAt,
}: VideoCardProps) {
    const navigate = useNavigate();
    const watch = () => {
        navigate(`/watch/${id}`);
    };

    return (
        <div
            onClick={watch}
            className="my-5 grid grid-cols-2 gap-5 group p-0 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-black/20 hover:cursor-pointer animate-fade-in-up"
        >
            <div className="relative aspect-video rounded-xl overflow-hidden">
                <img
                    src={thumbnail}
                    alt={title}
                    className="absolute object-contain transition-transform duration-700 ease-out"
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
            </div>
            <div>
                <h3 className="text-lg font-medium text-white line-clamp-2 mb-2 group-hover:text-neutral-200 transition-colors duration-300 leading-snug">
                    {title}
                </h3>
                <p className="text-neutral-400 text-md mb-2 group-hover:text-neutral-300 transition-colors duration-300">
                    {uploaderName}
                </p>
                <div className="flex items-center text-sm text-neutral-500 space-x-2 group-hover:text-neutral-400 transition-colors duration-300">
                    <span className="flex items-center space-x-1">
                        <span>{formatNumber(viewCount)} views</span>
                    </span>
                    <span>•</span>
                    <span>{formatDate(createdAt)}</span>
                </div>
                <p className="my-3 text-sm text-neutral-500 group-hover:text-neutral-400 transition-colors duration-300">
                    {description}
                </p>
            </div>
        </div>
    );
}
