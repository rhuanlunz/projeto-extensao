import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {Field,FieldContent, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(to_bottom,_#0085FF_50%,_#E0F2FF_50%)]">

      <Card className="h-[500px] w-[400px] rounded-2xl border-zinc-200 shadow-2xl">

        <CardContent className="flex h-full flex-col px-8 py-6">

          <div className="-mt-4 mb-0 flex justify-center">
            <img
              src="/logounesc.png"
              alt="Logo"
              className="h-16 w-16 object-contain"
            />
          </div>

          <div className="mb-5 text-center">
            <h1 className="mb-1 text-3xl font-bold text-[#0056A4]">
              Recursos
            </h1>

            <p className="text-sm text-zinc-500">
              Gestão de infraestrutura
            </p>
          </div>

          <div className="space-y-3">

            <Field>

              <FieldLabel className="text-sm font-medium text-zinc-700">
                Seu email
              </FieldLabel>

              <FieldContent>
                <Input
                  type="email"
                  className="mt-1 h-10 text-black"
                />
              </FieldContent>

            </Field>

            <Field>

              <FieldLabel className="text-sm font-medium text-zinc-700">
                Sua senha
              </FieldLabel>

              <FieldContent>

                <div className="relative mt-1">

                  <Input
                    type={showPassword ? "text" : "password"}
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
                  <button
                    type="button"
                    className="text-sm text-[#0056A4] hover:underline"
                  >
                    Esqueceu a senha?
                  </button>
                </div>

              </FieldContent>

            </Field>

            <div className="pt-2">

              <Button className="h-11 w-full bg-[#0056A4] text-base font-semibold text-white hover:bg-[#0074dd]">
                Entrar
              </Button>

              <div className="mt-4 h-px w-full bg-zinc-300" />

              <p className="mt-4 cursor-pointer text-center text-sm text-zinc-500 transition-colors hover:text-[#0056A4]">
                Solicitar acesso
              </p>

            </div>

          </div>

        </CardContent>

      </Card>

    </div>
  )
}