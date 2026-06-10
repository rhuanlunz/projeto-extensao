import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldSeparator, FieldSet, FieldTitle } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { Link, Navigate, useNavigate, useSearchParams  } from "react-router";
import { Toaster } from "@/components/ui/sonner"
import { useState } from "react";
import PasswordInput from "@/shared/PasswordInput/PasswordInput";
import resetPasswordService from "./services/resetPasswordService";

export default function ResetPassword() {
    const [loading, setLoading] = useState(false);
    const [ urlParams ] = useSearchParams();
    const [ newPassword, setNewPassword ] = useState('');
    const [ newPasswordConfirmation, setNewPasswordConfirmation ] = useState('');
    const navigate = useNavigate();
    const token = urlParams.get('token');
    const email = urlParams.get('email');

    if (!token || !email) return <Navigate to="/autenticacao/login" replace />;

    return (
        <div className="flex min-h-screen items-center p-5 justify-center bg-[linear-gradient(to_bottom,#0085FF_50%,#E0F2FF_50%)]">
            <Toaster />

            <form 
                className="bg-white rounded-[10px] shadow-xl w-md" 
                onSubmit={async (e) => {
                    e.preventDefault();
                    setLoading(true);

                    await resetPasswordService(
                        { email, newPassword, newPasswordConfirmation, token },
                        navigate
                    );

                    setLoading(false);
                }}
            >
                <FieldSet >
                    <FieldContent className="flex flex-col items-center justify-center text-center gap-4 p-10">
                        <img src="/logounesc.png" alt="Logo" className="h-20 w-20 object-contain" />
                        <FieldTitle className="text-2xl font-bold text-[#0058BE]">Redefinir senha</FieldTitle>

                        <FieldDescription className="text-center text-sm mb-5">
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
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-[#0058BE] p-5"
                                >
                                    {loading ? (
                                        <>
                                            <LoaderCircle className="animate-spin" />
                                            Redefinindo...
                                        </>
                                    ) : (
                                        <>
                                            Redefinir senha
                                            <ArrowRight />
                                        </>
                                    )}
                                </Button>
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