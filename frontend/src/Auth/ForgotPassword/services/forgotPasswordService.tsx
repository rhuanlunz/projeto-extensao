import { showErrorMessage, showSuccessMessage } from "@/wrappers/sonnerWrapper";

export default async function forgotPasswordService(email: string) {
    if (!email) {
        showErrorMessage('O E-mail não foi informado!');
        return;
    }

    try {
        const response = await fetch('http://localhost:8000/api/v1/auth/forgot', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email })
        });

        const data = await response.json();
        
        if (data.success != true) {
            showErrorMessage(data.message);
            return;
        }
        
        showSuccessMessage(data.message);
    } catch {
        showErrorMessage('Erro ao redefinir senha!');
    }
}