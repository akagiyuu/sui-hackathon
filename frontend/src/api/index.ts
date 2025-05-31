export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export const fetchWrapper = (url: RequestInfo | URL, init?: RequestInit) => {
    const apiUrl = `${API_URL}/${url}`;

    return fetch(apiUrl, {
        ...init,
        credentials: 'include',
    });
};

export * as auth from './auth';
