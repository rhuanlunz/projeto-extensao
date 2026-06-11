import { api } from "@/lib/api";
import { showErrorMessage } from "@/wrappers/sonnerWrapper";

interface ResetData {
  email: string;
  token: string;
  new_password: string;
  new_password_confirmation: string;
}

export default async function resetPasswordService(data: ResetData) {
    try {
        const response = await api.post('/auth/reset', data);
        return response.data;
    } catch (error: any) {
        const message = error.response?.data?.message || 'Erro ao redefinir senha!';
        showErrorMessage(message);
        return null;
    }
}
