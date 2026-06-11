import { api } from "@/lib/api";
import { showErrorMessage } from "@/wrappers/sonnerWrapper";

interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export default async function registerService(data: RegisterData) {
    try {
        const response = await api.post('/auth/register', data);
        return response.data;
    } catch (error: any) {
        const message = error.response?.data?.message || 'Erro ao realizar cadastro!';
        showErrorMessage(message);
        return null;
    }
}
