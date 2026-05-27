import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {Field,FieldContent,FieldLabel,} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { ArrowRight, LoaderCircle } from "lucide-react"
import { useState } from "react"
import { Toaster } from "sonner"
import registerService from "./services/registerService"
import { useNavigate } from "react-router"
import PasswordInput from "@/shared/PasswordInput/PasswordInput"

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <form onSubmit={async e => {
      e.preventDefault();
      setLoading(true);

      await registerService({ username, email, password, passwordConfirmation }, navigate);
      
      setLoading(false);
    }}>
      <div className="flex min-h-screen p-5 items-center justify-center bg-[linear-gradient(to_bottom,#0085FF_50%,#E0F2FF_50%)]">
        <Toaster />

        <Card className="h-145 w-100 rounded-2xl border-zinc-200 shadow-2xl">

          <CardContent className="flex h-full flex-col justify-center px-8 py-10">

            <div className="-mb-1 flex justify-center">
              <img
                src="/logounesc.png"
                alt="Logo"
                className="h-20 w-20 object-contain"
              />
            </div>

            <div className="mb-3 text-center">
              <h1 className="mb-0 text-3xl font-bold text-[#0056A4]">
                Recursos
              </h1>

              <p className="mb-1 text-sm text-zinc-500">
                Gestão de infraestrutura
              </p>
            </div>

            <div className="space-y-5">

              <Field>

                <FieldLabel className="mt-0 text-sm font-medium">
                  Nome de usuário
                </FieldLabel>

                <FieldContent>
                  <Input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="mt-0 h-10 text-black"
                  />
                </FieldContent>

              </Field>

              <Field>

                <FieldLabel className="mt-0 text-sm font-medium">
                  E-mail
                </FieldLabel>

                <FieldContent>
                  <Input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="mt-0 h-10 text-black"
                  />
                </FieldContent>

              </Field>

              <Field>

                <FieldLabel className="mt-0 text-sm font-medium">
                  Senha
                </FieldLabel>

                <FieldContent>

                  <div className="relative mt-0">
                    <PasswordInput 
                      id="new-password" 
                      name="new-password" 
                      placehoder="Digite sua senha"
                      value={password}
                      onChange={setPassword}
                    />
                  </div>

                </FieldContent>

              </Field>

              <Field>

                <FieldLabel className="mt-0text-sm font-medium">
                  Confirmar senha
                </FieldLabel>

                <FieldContent>

                  <div className="relative mt-0">
                    <PasswordInput 
                      id="new-password" 
                      name="new-password" 
                      placehoder="Confirme sua senha"
                      value={passwordConfirmation}
                      onChange={setPasswordConfirmation}
                    />
                  </div>

                </FieldContent>

              </Field>

              <div className="pt-3">
                <Field>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="bg-[#0058BE] p-5 cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <LoaderCircle className="animate-spin" />
                          Cadastrando...
                        </>
                      ) : (
                        <>
                          Realizar cadastro
                          <ArrowRight />
                        </>
                      )}
                    </Button>
                </Field>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  )
}