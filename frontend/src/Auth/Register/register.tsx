import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {Field,FieldContent,FieldLabel,} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(to_bottom,_#0085FF_50%,_#E0F2FF_50%)]">

      <Card className="h-[580px] w-[400px] rounded-2xl border-zinc-200 shadow-2xl">

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

              <FieldLabel className="mt-0 text-sm font-medium text-zinc-700">
                Nome de usuário
              </FieldLabel>

              <FieldContent>
                <Input
                  type="text"
                  className="mt-0 h-10 text-black"
                />
              </FieldContent>

            </Field>

            <Field>

              <FieldLabel className="mt-0 text-sm font-medium text-zinc-700">
                E-mail
              </FieldLabel>

              <FieldContent>
                <Input
                  type="email"
                  className="mt-0 h-10 text-black"
                />
              </FieldContent>

            </Field>

            <Field>

              <FieldLabel className="mt-0 text-sm font-medium text-zinc-700">
                Senha
              </FieldLabel>

              <FieldContent>

                <div className="relative mt-0">

                  <Input
                    type={showPassword ? "text" : "password"}
                    className="mt-0 h-10 pr-10 text-black"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-800"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>

              </FieldContent>

            </Field>

            <Field>

              <FieldLabel className="mt-0text-sm font-medium text-zinc-700">
                Confirmar senha
              </FieldLabel>

              <FieldContent>

                <div className="relative mt-0">

                  <Input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    className="mt-0 h-10 pr-10 text-black"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-800"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>

              </FieldContent>

            </Field>

            <div className="pt-3">

              <Button className="-mt-3 h-11 w-full bg-[#0056A4] text-base font-semibold text-white hover:bg-[#0074dd]">
                Enviar
              </Button>

            </div>

          </div>

        </CardContent>

      </Card>

    </div>
  )
}