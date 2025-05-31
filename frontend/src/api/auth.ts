import { API_URL, fetchWrapper } from '.';

type Provider = 'google' | 'microsoft';

export const login = async (provider: Provider) => {
    window.location.href = `${API_URL}/auth/${provider}`;
};
