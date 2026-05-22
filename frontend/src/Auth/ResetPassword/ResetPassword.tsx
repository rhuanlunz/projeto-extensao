import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldSeparator, FieldSet, FieldTitle } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link, Navigate, useSearchParams  } from "react-router";
import { Toaster } from "@/components/ui/sonner"
import { useState } from "react";
import PasswordInput from "./components/PasswordInput";
import resetPasswordService from "./services/resetPasswordService";

export default function ResetPassword() {
    const [ urlParams ] = useSearchParams();
    const [ newPassword, setNewPassword ] = useState('');
    const [ newPasswordConfirmation, setNewPasswordConfirmation ] = useState('');
    const token = urlParams.get('token');
    const email = urlParams.get('email');

    if (!token || !email) return <Navigate to="/autenticacao/login" replace />;

    return (
        <div className="h-dvh flex items-center p-5 justify-center bg-[linear-gradient(to_top,white_0%,white_50%,#0058BE_50%,#0058BE_100%)]">
            <Toaster />

            <form 
                className="bg-white rounded-[10px] shadow-xl w-md" 
                onSubmit={(e) => {
                    e.preventDefault();
                    resetPasswordService({ email, newPassword, newPasswordConfirmation, token});
                }}
            >
                <FieldSet >
                    <FieldContent className="flex flex-col items-center justify-center text-center gap-4 p-10">
                        <img src="/unesc_logo.png" alt="Logo" className="w-20 h-20 object-contain" />
                        <FieldTitle className="text-2xl font-bold text-[#0058BE]">Redefinir senha</FieldTitle>

                        <FieldDescription className="text-center text-1xl mb-5">
                            Defina uma nova senha para acessar sua conta.
                        </FieldDescription>

                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="new-password">Nova Senha</FieldLabel>
                                <PasswordInput 
                                    id="new-password" 
                                    name="new-password" 
                                    placehoder="Digite a nova senha"
                                    value={newPassword}
                                    onChange={setNewPassword}
                                />
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="new-password-confirmation">Confirmar Senha</FieldLabel>
                                <PasswordInput 
                                    id="new-password-confirmation" 
                                    name="new-password-confirmation" 
                                    placehoder="Confirme a nova senha"
                                    value={newPasswordConfirmation}
                                    onChange={setNewPasswordConfirmation}
                                />
                            </Field>

                            <Field>
                                <Button className="bg-[#0058BE] p-5 cursor-pointer">Redefinir senha <ArrowRight /></Button>
                            </Field>

                            <FieldSeparator />

                            <Field>
                                <Link to="/autenticacao/login" className="text-[#0058BE] underline">Voltar para login</Link>
                            </Field>
                        </FieldGroup>
                    </FieldContent>
                </FieldSet>
            </form>
        </div>
    );
}