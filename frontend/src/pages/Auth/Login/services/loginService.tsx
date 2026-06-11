import { api } from "@/lib/api";
import { showErrorMessage } from "@/wrappers/sonnerWrapper";

interface Credentials {
  email: string
  password: string
}

export default async function loginService(loginCredentials: Credentials) {
    if (!loginCredentials.email) {
        showErrorMessage('O email não foi informado!');
        return null;
    }

    if (!loginCredentials.password) {
        showErrorMessage('A senha não foi informada!');
        return null;
    }

    try {
        const response = await api.post('/auth/login', {
            email: loginCredentials.email,
            password: loginCredentials.password,
        });

        return response.data;
    } catch (error: any) {
        const message = error.response?.data?.message || 'Erro ao realizar login!';
        showErrorMessage(message);
        return null;
    }
}
