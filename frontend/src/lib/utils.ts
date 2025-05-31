import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatDistance } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const pad = (num: number): string => num.toString().padStart(2, '0');

export function formatDuration(totalSeconds: number) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    if (minutes > 0) return `${pad(minutes)}:${pad(seconds)}`;

    return `0:${pad(seconds)}`;
}

export function formatDate(date: Date) {
    return formatDistance(date, new Date(), { addSuffix: true });
}

export function formatNumber(value: number) {
    return new Intl.NumberFormat(undefined, {
        notation: 'compact',
        compactDisplay: 'short',
        maximumFractionDigits: 1,
    }).format(value);
}
