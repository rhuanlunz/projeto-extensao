import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldSeparator, FieldSet, FieldTitle } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";
import { Toaster } from "sonner";
import forgotPasswordService from "./services/forgotPasswordService";

export default function ForgotPassword() {
    const [ email, setEmail ] = useState('');

    return (
        <div className="h-dvh flex items-center p-5 justify-center bg-[linear-gradient(to_top,white_0%,white_50%,#0058BE_50%,#0058BE_100%)]">
            <Toaster />
            
            <form 
                className="bg-white rounded-[10px] shadow-xl w-md" 
                onSubmit={(e) => {
                    e.preventDefault();
                    forgotPasswordService(email);
                }}
            >
                <FieldSet>
                    <FieldContent className="flex flex-col items-center justify-center text-center gap-4 p-10">
                        <img src="/unesc_logo.png" alt="Logo" className="w-20 h-20 object-contain" />
                        <FieldTitle className="text-2xl font-bold text-[#0058BE]">Recuperar senha</FieldTitle>

                        <FieldDescription className="text-center text-1xl mb-5">
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
                                    className="p-5 rounded-lg bg-gray-100 border-0"
                                />
                            </Field>

                            <Field>
                                <Button className="bg-[#0058BE] p-5 cursor-pointer">Enviar Link de Recuperação <ArrowRight /></Button>
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