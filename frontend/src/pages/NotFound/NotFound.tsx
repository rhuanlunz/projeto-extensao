import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, FileX2 } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(to_bottom,_#0085FF_50%,_#E0F2FF_50%)] px-6">

      <Card className="w-[400px] rounded-2xl border-zinc-200 shadow-2xl">

        <CardContent className="flex flex-col items-center px-8 py-9">

          <div className="mb-3 flex justify-center">
            <img
              src="/logounesc.png"
              alt="Logo"
              className="h-18 w-18 object-contain"
            />
          </div>

          <div className="mb-7 text-center">

            <h1 className="text-3xl font-bold text-[#0056A4]">
              Recursos
            </h1>

            <p className="mt-1 text-sm text-zinc-500">
              Gestão de infraestrutura
            </p>

          </div>

          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-xl bg-[#0056A4]/10">

            <FileX2
              size={30}
              className="text-[#0056A4]"
            />

          </div>

          <h2 className="text-5xl font-extrabold text-[#0056A4]">
            404
          </h2>

          <h3 className="mt-2 text-xl font-bold text-zinc-800">
            Página não encontrada
          </h3>

          <p className="mt-3 max-w-[280px] text-center text-sm leading-relaxed text-zinc-500">
            A página que você tentou acessar não existe
            ou foi movida.
          </p>

          <Button className="mt-7 h-11 w-full bg-[#0056A4] text-base font-semibold text-white hover:bg-[#0074dd]">

            <ArrowLeft size={18} />

            Voltar ao início

          </Button>

        </CardContent>

      </Card>

    </div>
  )
}