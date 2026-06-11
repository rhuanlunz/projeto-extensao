import { api } from "@/lib/api";
import { showErrorMessage } from "@/wrappers/sonnerWrapper";

export default async function logoutUser() {
    try {
        await api.get('/auth/logout');
        localStorage.removeItem('access_token');
        return true;
    } catch (error: any) {
        console.error('Erro ao realizar logout:', error);
        // Mesmo com erro, removemos o token localmente
        localStorage.removeItem('access_token');
        return true;
    }
}
