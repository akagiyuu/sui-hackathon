import { API_URL, fetchWrapper } from '.';

type Provider = 'google' | 'microsoft';

export const login = async (provider: Provider) => {
    window.location.href = `${API_URL}/auth/${provider}`;
};

export interface Account {
    email: string;
    name: string;
}

export const me = async () => {
    const response = await fetchWrapper('auth/me');

    if (!response.ok) {
        throw new Error('Missing authentication token');
    }

    return (await response.json()) as Account;
};

export const logout = async () => {
    await fetchWrapper('auth/logout');
    location.reload();
};
