import { showErrorMessage } from "@/wrappers/sonnerWrapper";
import type { NavigateFunction } from "react-router";

interface Credentials {
  email: string
  password: string
}

export default async function loginService(loginCredentials: Credentials, navigate: NavigateFunction) {
    if (!loginCredentials.email) {
        showErrorMessage('O email não foi informado!');
        return;
    }

    if (!loginCredentials.password) {
        showErrorMessage('A senha não foi informada!');
        return;
    }

    try {
        const response = await fetch('http://localhost:8000/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: loginCredentials.email,
                password: loginCredentials.password,
            })
        });

        const jsonData = await response.json();

        if (jsonData.success == false) {
            showErrorMessage(jsonData.message);
            return;
        }

        localStorage.setItem('access_token', jsonData.data.access_token);

        navigate('/', { replace: true });
    } catch {
        showErrorMessage('Erro ao redefinir senha!');
    }
}