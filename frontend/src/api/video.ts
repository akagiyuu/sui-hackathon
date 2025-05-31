import { fetchWrapper } from '.';

interface UploadVideo {
    video: File;
    thumbnail: File;
    title: string;
    description: string;
}

export const upload = async (data: UploadVideo) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
        formData.append(key, value);
    }

    fetchWrapper('video', {
        method: 'POST',
        body: formData,
    });
};

export interface Video {
    id: string;
    video: string;
    thumbnail: string;
    title: string;
    description: string;
    uploaderEmail: string;
    uploaderName: string;
    duration: number;
    viewCount: number;
    likeCount: number;
    dislikeCount: number;
    createdAt: Date;
}

export const get = async (id: string) => {
    const response = await fetchWrapper(`video/${id}`);

    if (!response.ok) {
        throw new Error('Invalid video id');
    }

    return (await response.json()) as Video;
};

export const getAll = async () => {
    const response = await fetchWrapper('video');

    if (!response.ok) {
        throw new Error('Failed to fetch video list');
    }

    return (await response.json()) as Video[];
};
