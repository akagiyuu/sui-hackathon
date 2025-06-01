import { Button } from '@/components/ui/button';
import { VideoCard } from '@/components/video-card';
import { formatDate, formatNumber } from '@/lib/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ThumbsUp, ThumbsDown, Share, Download } from 'lucide-react';
import { Link, useParams } from 'react-router';
import * as api from '@/api';
import { toast } from 'sonner';
import { Dialog } from '@radix-ui/react-dialog';
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import type { ReactionKind } from '@/api/video';

function Video() {
    const params = useParams();
    const queryClient = useQueryClient();

    const {
        data: video,
        error,
        isPending,
    } = useQuery({
        queryKey: ['video', params.id],
        queryFn: () => api.video.get(params.id!),
    });

    const { mutate: react } = useMutation({
        mutationFn: (kind: ReactionKind) => api.video.react(params.id!, kind),
        onSuccess: () => {
            toast.success('Add reaction successfully');
            queryClient.invalidateQueries({
                queryKey: ['video', params.id],
            });
        },
        onError: (error) => toast.error(error.message),
    });

    if (isPending) {
        return <div></div>;
    }

    if (error) {
        toast.error(error.message);
        return <div></div>;
    }

    return (
        <div className="lg:col-span-2">
            <div className="bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 mb-6 animate-fade-in hover:border-neutral-700 transition-colors duration-300">
                <div className="aspect-video bg-black">
                    <video
                        className="w-full h-full"
                        controls
                        preload="metadata"
                        poster={video.thumbnail}
                    >
                        <source src={video.video} />
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
                            <div className="w-10 h-10 bg-red-400 rounded-full flex items-center justify-center text-white font-medium transition-colors duration-300">
                                {video.uploaderName[0]}
                            </div>
                            <div>
                                <p className="font-medium text-white">
                                    {video.uploaderName}
                                </p>
                                <p className="text-xs text-white">
                                    {video.uploaderEmail}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2 animate-slide-left">
                            <div className="flex items-center bg-neutral-800 rounded-full border border-neutral-700 hover:border-neutral-600 transition-colors duration-300">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="rounded-l-full text-white hover:bg-neutral-700 px-4 hover:scale-105 transition-all duration-300"
                                    onClick={() => react('like')}
                                >
                                    <ThumbsUp className="w-4 h-4 mr-2" />
                                    {formatNumber(video.likeCount)}
                                </Button>
                                <div className="w-px h-6 bg-neutral-700" />
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="rounded-r-full text-white hover:bg-neutral-700 px-3 hover:scale-105 transition-all duration-300"
                                    onClick={() => react('dislike')}
                                >
                                    <ThumbsDown className="w-4 h-4" />
                                    {formatNumber(video.dislikeCount)}
                                </Button>
                            </div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 px-4 hover:scale-105 transition-all duration-300"
                                    >
                                        <Share className="w-4 h-4 mr-2" />
                                        Share
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="dark text-white sm:max-w-md">
                                    <DialogHeader>
                                        <DialogTitle>Share link</DialogTitle>
                                        <DialogDescription>
                                            Anyone who has this link will be
                                            able to view this.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="flex items-center gap-2">
                                        <div className="grid flex-1 gap-2">
                                            <Label
                                                htmlFor="link"
                                                className="sr-only"
                                            >
                                                Link
                                            </Label>
                                            <Input
                                                id="link"
                                                defaultValue={
                                                    window.location.href
                                                }
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter className="sm:justify-start">
                                        <DialogClose asChild>
                                            <Button
                                                type="button"
                                                variant="secondary"
                                            >
                                                Close
                                            </Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 px-4 hover:scale-105 transition-all duration-300"
                                onClick={() =>
                                    window.location.replace(video.video)
                                }
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Download
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-4 text-sm text-neutral-400 animate-fade-in">
                    <span className="flex items-center space-x-1">
                        <span>{formatNumber(video.viewCount)} views</span>
                    </span>
                    <span>•</span>
                    <span>{formatDate(video.createdAt)}</span>
                </div>

                <div className="bg-neutral-900 rounded-xl p-4 border border-neutral-800 hover:border-neutral-700 transition-all duration-300 animate-fade-in-up">
                    <div className="space-y-3">
                        <p className="text-sm font-medium text-white">
                            Description
                        </p>
                        <p className="text-neutral-300 text-sm leading-relaxed whitespace-pre-line">
                            {video.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Suggestion() {
    const params = useParams();

    const {
        data: suggestedVideos,
        error,
        isPending,
    } = useQuery({
        queryKey: ['video', params.id, 'suggestion'],
        queryFn: () => api.video.getSuggestion(params.id!),
    });

    if (isPending) {
        return <div></div>;
    }

    if (error) {
        toast.error(error.message);
        return <div></div>;
    }

    return (
        <div className="space-y-4 animate-fade-in-delay">
            <h3 className="font-semibold text-white">Suggested Videos</h3>
            <div>
                {suggestedVideos.map((video, index) => (
                    <Link
                        key={index}
                        to={`/watch/${video.id}`}
                        className="group animate-fade-in-up"
                    >
                        <VideoCard className="w-xs" {...video} />
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default function WatchPage() {
    return (
        <div className="max-w-8xl mx-auto px-6 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Video />
                <Suggestion />
            </div>
        </div>
    );
}
