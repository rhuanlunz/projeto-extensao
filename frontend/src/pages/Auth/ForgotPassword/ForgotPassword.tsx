import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldSeparator, FieldSet, FieldTitle } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";
import { Toaster } from "sonner";
import forgotPasswordService from "./services/forgotPasswordService";

export default function ForgotPassword() {
    const [ loading, setLoading ] = useState(false);
    const [ email, setEmail ] = useState('');

    return (
        <div className="flex min-h-screen p-5 items-center justify-center bg-[linear-gradient(to_bottom,#0085FF_50%,#E0F2FF_50%)]">
            <Toaster />
            
            <form 
                className="bg-white rounded-[10px] shadow-xl w-md" 
                onSubmit={async (e) => {
                    e.preventDefault();
                    setLoading(true);
                    
                    await forgotPasswordService(email);

                    setLoading(false);
                }}
            >
                <FieldSet>
                    <FieldContent className="flex flex-col items-center justify-center text-center gap-4 p-10">
                        <img src="/logounesc.png" alt="Logo" className="-mb-4 h-16 w-16 object-contain"/>
                        <FieldTitle className="text-2xl font-bold text-[#0058BE]">Recuperar senha</FieldTitle>

                        <FieldDescription className="text-center text-sm mb-5">
                            Informe seu email para receber as instruções de recuperação.
                        </FieldDescription>

                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="email">E-mail</FieldLabel>
                                <Input 
                                    name="email" 
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="nome@empresa.com.br" 
                                    className="p-5 rounded-lg bg-gray-100 border-0 text-black"
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
                                            Enviando...
                                        </>
                                    ) : (
                                        <>
                                            Enviar link
                                            <ArrowRight />
                                        </>
                                    )}
                                </Button>
                            </Field>

                            <FieldSeparator />

                            <Field>
                                <p>
                                    Já possui uma conta? <Link to="/autenticacao/login" className="text-[#0058BE] underline">Realizar login</Link>
                                </p>
                            </Field>
                        </FieldGroup>
                    </FieldContent>
                </FieldSet>
            </form>
        </div>
    );
}