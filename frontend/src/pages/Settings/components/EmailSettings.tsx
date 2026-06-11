import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getRequestEmail, updateRequestEmail } from "../services/settings.service";
import { toast } from "sonner";
import { Mail, Save } from "lucide-react";

export function EmailSettings() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const data = await getRequestEmail();
        setEmail(data);
      } catch {
        toast.error("Erro ao carregar e-mail de configuração.");
      } finally {
        setLoading(false);
      }
    };
    fetchEmail();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await updateRequestEmail(email);
      toast.success("E-mail de destino atualizado com sucesso!");
    } catch {
      toast.error("Erro ao atualizar e-mail.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-primary" />
          E-mail de Destino
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-sm text-slate-500">
            Defina o e-mail que receberá todas as solicitações de recursos feitas pelos usuários.
          </p>
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="exemplo@unesc.net"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 h-12 rounded-xl px-4 text-base bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#0056A4]/20 focus:border-[#0056A4] transition-all"
            />
            <Button type="submit" disabled={isSubmitting} className="h-12 px-6">
              <Save className="h-4 w-4 mr-2" />
              {isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
