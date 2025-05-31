import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatDistance } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDuration(seconds: number) {
    return new Intl.DurationFormat('en', { style: 'digital' }).format({
        seconds,
    });
}

export function formatDate(date: Date) {
    return formatDistance(date, new Date(), { addSuffix: true });
}
