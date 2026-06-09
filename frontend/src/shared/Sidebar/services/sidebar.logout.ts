import { showErrorMessage } from "@/wrappers/sonnerWrapper";
import type { NavigateFunction } from "react-router";

export default async function logoutUser(navigate: NavigateFunction) {
    try {
        const access_token = localStorage.getItem('access_token') ?? '';
        
        const response = await fetch('http://localhost:8000/api/v1/auth/logout', {
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();
        if (!data.success) {
            showErrorMessage(data.message);
            return;
        }

        localStorage.clear();
        navigate('/autenticacao/login');
    } catch {
        showErrorMessage('Erro durante o logout!');
    }
}