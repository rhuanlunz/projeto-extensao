import { api } from "@/lib/api";

export interface User {
  id: string;
  name: string;
  email: string;
  role: {
    id: number;
    name: string;
  };
}

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get('/users');
  return response.data.data;
};

export const updateUserRole = async (userId: string, roleId: number) => {
  const response = await api.patch(`/users/${userId}/role`, { role_id: roleId });
  return response.data.data;
};

export const getRequestEmail = async (): Promise<string> => {
  try {
    const response = await api.get('/settings/request-email');
    return response.data.data.email || "";
  } catch (error: any) {
    if (error.response?.status === 404) return "";
    throw error;
  }
};

export const updateRequestEmail = async (email: string) => {
  // O backend tem post para criar e put para atualizar, mas o controller sugere que post tbm pode ser usado
  // Vamos tentar PUT primeiro, se falhar ou se não existir (404), tentamos POST
  try {
    const response = await api.put('/settings/request-email', { email });
    return response.data.data;
  } catch (error: any) {
    const response = await api.post('/settings/request-email', { email });
    return response.data.data;
  }
};
