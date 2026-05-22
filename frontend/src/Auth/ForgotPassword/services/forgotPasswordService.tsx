import { showErrorMessage, showSuccessMessage } from "@/wrappers/sonnerWrapper";

export default function forgotPasswordService(email: string) {
    if (!email) {
        showErrorMessage('O E-mail não foi informado!');
        return;
    }

    fetch('http://localhost:8000/api/v1/auth/forgot', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email })
    })
    .then(response => response.json())
    .then(data => {
        if (!data.success || data.success == false) {
            showErrorMessage(data.message);
            return;
        }
        showSuccessMessage(data.message);
    });
}