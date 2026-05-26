import { showErrorMessage } from "@/wrappers/sonnerWrapper";
import type { NavigateFunction } from "react-router";

interface ResetPassword {
    email: string;
    newPassword: string;
    newPasswordConfirmation: string;
    token: string;
}

export default async function resetPasswordService(passwordsData: ResetPassword, navigate: NavigateFunction) {
    if (!passwordsData.newPassword) {
        showErrorMessage('A nova senha não foi informada!');
        return;
    }

    if (passwordsData.newPassword.length < 8) {
        showErrorMessage('A nova senha deve ter no mínimo 8 caracteres!');
        return;
    }

    if (!passwordsData.newPasswordConfirmation) {
        showErrorMessage('A confirmação da senha não foi informada!');
        return;
    }

    if (passwordsData.newPasswordConfirmation.length < 8) {
        showErrorMessage('A confirmação da senha deve ter no mínimo 8 caracteres!');
        return;
    }

    if (passwordsData.newPassword !== passwordsData.newPasswordConfirmation) {
        showErrorMessage('As senhas não coincidem!');
        return;
    }

    try {
        const response = await fetch('http://localhost:8000/api/v1/auth/reset', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: passwordsData.email,
                new_password: passwordsData.newPassword,
                new_password_confirmation: passwordsData.newPasswordConfirmation,
                token: passwordsData.token
            })
        });

        const data = await response.json();

        if (data.success == false) {
            showErrorMessage(data.message);
            return;
        }

        navigate('/autenticacao/login', { replace: true });
    } catch {
        showErrorMessage('Erro ao redefinir senha!');
    }
}