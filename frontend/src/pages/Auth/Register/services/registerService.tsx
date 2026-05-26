import { showErrorMessage } from "@/wrappers/sonnerWrapper";
import type { NavigateFunction } from "react-router";

interface Credentials {
    username: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

export default async function registerService(registerCredentials: Credentials, navigate: NavigateFunction) {
    if (!registerCredentials.username) {
        showErrorMessage('O nome de usuário não foi informado!');
        return;
    }

    if (!registerCredentials.email) {
        showErrorMessage('O email não foi informado!');
        return;
    }

    if (!registerCredentials.password) {
        showErrorMessage('A senha não foi informada!');
        return;
    }

    if (registerCredentials.password.length < 8) {
        showErrorMessage('A nova senha deve ter no mínimo 8 caracteres!');
        return;
    }
    
    if (!registerCredentials.passwordConfirmation) {
        showErrorMessage('A confirmação da senha não foi informada!');
        return;
    }

    if (registerCredentials.passwordConfirmation.length < 8) {
        showErrorMessage('A confirmação da senha deve ter no mínimo 8 caracteres!');
        return;
    }

    if (registerCredentials.password !== registerCredentials.passwordConfirmation) {
        showErrorMessage('As senhas não coincidem!');
        return;
    }

    try {
        const response = await fetch('http://localhost:8000/api/v1/auth/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: registerCredentials.username,
                email: registerCredentials.email,
                password: registerCredentials.password,
                password_confirmation: registerCredentials.passwordConfirmation
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
        showErrorMessage('Erro ao cadastrar novo usuário!');
    }
}