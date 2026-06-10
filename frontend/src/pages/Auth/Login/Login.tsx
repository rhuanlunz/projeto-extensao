import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldContent, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { ArrowRight, LoaderCircle } from "lucide-react"
import { useState } from "react"
import loginService from "./services/loginService"
import { Link, useNavigate } from "react-router"
import { Toaster } from "sonner"
import PasswordInput from "@/shared/PasswordInput/PasswordInput";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  return (
    <form onSubmit={async e => {
      e.preventDefault();
      setLoading(true);

      await loginService({ email, password }, navigate);

      setLoading(false);
    }}>
      <div className="flex min-h-screen p-5 items-center justify-center bg-[linear-gradient(to_bottom,#0085FF_50%,#E0F2FF_50%)]">
        <Toaster />

        <Card className="bg-white rounded-[10px] shadow-xl w-md">
          <CardContent className="flex h-full flex-col px-8 py-6">
            <div className="-mt-4 mb-0 flex justify-center">
              <img
                src="/logounesc.png"
                alt="Logo"
                className="h-20 w-20 object-contain"
              />
            </div>

            <div className="mb-5 text-center">
              <h1 className="mb-1 text-3xl font-bold text-[#0056A4]">
                Login
              </h1>

              <p className="text-sm text-zinc-500">
                Gestão de infraestrutura
              </p>
            </div>

            <div className="space-y-3">
              <Field>
                <FieldLabel className="text-sm font-medium">
                  E-mail
                </FieldLabel>

                <FieldContent>
                  <Input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="p-5 rounded-lg bg-gray-100 border-0 text-black"
                    placeholder="nome@empresa.com.br"
                  />
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel className="text-sm font-medium">
                  Senha
                </FieldLabel>

                <FieldContent>
                  <div className="relative mt-1">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="h-10 pr-10 text-black"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors hover:text-zinc-800"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>

                  <div className="mt-2 flex justify-end">
                    <Link
                      to="/autenticacao/esqueci-minha-senha"
                      className="text-[#0058BE] underline"
                    >
                      Esqueceu a senha?
                    </Link>
                  </div>
                </FieldContent>
              </Field>

              <div className="pt-2">
                <Field>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-[#0058BE] p-5"
                  >
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" />
                        Entrando...
                      </>
                    ) : (
                      <>
                        Entrar
                        <ArrowRight />
                      </>
                    )}
                  </Button>
                </Field>

                <div className="mt-4 h-px w-full bg-zinc-300" />

                <Field>
                  <Link to="/autenticacao/cadastro" className="underline mt-4 cursor-pointer text-center text-sm text-zinc-500 transition-colors hover:text-[#0056A4]">
                    Realizar cadastro
                  </Link>
                </Field>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  )
}