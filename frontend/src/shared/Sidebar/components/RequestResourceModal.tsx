import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCategories, getResourcesGrouped } from "@/pages/Resources/services/resourceForm.service";
import { api } from "@/lib/api";
import { toast } from "sonner";

const requestSchema = z.object({
  category_id: z.string().min(1, "A categoria é obrigatória"),
  resource_id: z.string().min(1, "O recurso é obrigatório"),
  description: z
    .string()
    .min(10, "A descrição deve ter pelo menos 10 caracteres")
    .max(500, "A descrição deve ter no máximo 500 caracteres")
    .regex(/^[^\d]+$/, "A descrição não pode conter números"),
});

type RequestFormValues = z.infer<typeof requestSchema>;

interface RequestResourceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RequestResourceModal({
  open,
  onOpenChange,
}: RequestResourceModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [resources, setResources] = useState<{ id: string; name: string; categoryId: number }[]>([]);

  const form = useForm<RequestFormValues>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      category_id: "",
      resource_id: "",
      description: "",
    },
  });

  const selectedCategoryId = form.watch("category_id");

  useEffect(() => {
    if (open) {
      const fetchData = async () => {
        try {
          const [catsData, resourcesGrouped] = await Promise.all([
            getCategories(),
            getResourcesGrouped()
          ]);
          setCategories(catsData);
          
          const flatResources: any[] = [];
          Object.values(resourcesGrouped).forEach((items: any) => {
            items.forEach((item: any) => {
              flatResources.push({
                id: item.id.toString(),
                name: item.name,
                categoryId: item.category.id
              });
            });
          });
          setResources(flatResources);
        } catch {
          toast.error("Erro ao carregar dados para solicitação.");
        }
      };
      fetchData();
    }
  }, [open]);

  // Reset resource if category changes
  useEffect(() => {
    form.setValue("resource_id", "");
  }, [selectedCategoryId, form]);

  const filteredResources = resources.filter(
    (r) => r.categoryId.toString() === selectedCategoryId
  );

  const onSubmit = async (values: RequestFormValues) => {
    setIsSubmitting(true);
    try {
      const selectedResource = resources.find(r => r.id === values.resource_id);

      if (!selectedResource) {
        toast.error("Recurso não encontrado.");
        return;
      }

      await api.post("/resource-requests", {
        resource: selectedResource.name,
        description: values.description,
      });

      toast.success("Solicitação enviada com sucesso!");
      form.reset();
      onOpenChange(false);
    } catch (error: any) {
      const message = error.response?.data?.message || "Erro ao enviar solicitação. Tente novamente.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "h-12 rounded-xl px-4 text-base bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#0056A4]/20 focus:border-[#0056A4] transition-all";
  const labelClasses = "text-[15px] font-semibold text-slate-700 mb-2";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="bg-black/30 backdrop-blur-sm z-50" />
        <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none rounded-2xl z-50">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-xl font-bold text-slate-800">Solicitar Recurso</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 p-6">
              <FormField
                control={form.control}
                name="category_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClasses}>Categoria</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className={inputClasses}>
                          <SelectValue placeholder="Selecione a categoria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-xl border-slate-200">
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id.toString()} className="rounded-lg">
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="resource_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClasses}>Recurso</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value}
                      disabled={!selectedCategoryId}
                    >
                      <FormControl>
                        <SelectTrigger className={inputClasses}>
                          <SelectValue placeholder={selectedCategoryId ? "Selecione o recurso" : "Selecione uma categoria primeiro"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-xl border-slate-200">
                        {filteredResources.map((res) => (
                          <SelectItem key={res.id} value={res.id} className="rounded-lg">
                            {res.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClasses}>Descrição do Problema / Necessidade</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Descreva detalhadamente o motivo da sua solicitação..." 
                        className="min-h-[120px] rounded-xl p-4 text-base bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#0056A4]/20 focus:border-[#0056A4] transition-all resize-none"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={isSubmitting}
                  className="h-12 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50"
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting} className="h-12 rounded-xl bg-primary hover:bg-primary/90 px-8">
                  {isSubmitting ? "Enviando..." : "Enviar Solicitação"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
