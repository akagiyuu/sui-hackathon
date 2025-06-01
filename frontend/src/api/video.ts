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

    const response = await fetchWrapper('video', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Failed to upload book');
    }
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

export const getSuggestion = async (id: string) => {
    const response = await fetchWrapper(`video/${id}/suggestion`);

    if (!response.ok) {
        throw new Error('Failed to fetch video list');
    }

    return (await response.json()) as Video[];
};

export const queryAll = async (query: string | null) => {
    const response = await fetchWrapper(`video?query=${query ?? ''}`);

    if (!response.ok) {
        throw new Error('Failed to fetch video list');
    }

    return (await response.json()) as Video[];
};
