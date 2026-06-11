import { api } from "@/lib/api";
import { showErrorMessage } from "@/wrappers/sonnerWrapper";

export default async function forgotPasswordService(email: string) {
    try {
        const response = await api.post('/auth/forgot', { email });
        return response.data;
    } catch (error: any) {
        const message = error.response?.data?.message || 'Erro ao enviar e-mail de recuperação!';
        showErrorMessage(message);
        return null;
    }
}
